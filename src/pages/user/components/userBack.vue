<script setup lang="ts">
import {useWindowStore} from "~/stores/window";
import {useUserStore} from "~/stores/user";
import {onMounted, ref} from "vue";

const window = useWindowStore()
const user = useUserStore()
const width = window.width
const height = window.height - 45

const resize = ref(false)

</script>

<template>
  <el-image class="picture_background" src="../../../public/pictures/user_background.png"></el-image>
  <el-image class="user_profile" :src="user.picture" @mouseenter="resize=true" @mouseleave="resize=false"></el-image>
  <div v-if="resize" class="user_profile mask" ><div style="margin-top: 17px;margin-right: 5px"><span>修改头像</span></div></div>
  <div class="user_name">{{user.username}}</div>
  <div class="user_background"></div>
</template>

<style scoped>
@keyframes myFirst
{
  from {opacity: 0}
  to {opacity: 0.8}
}

@keyframes showOut
{
  from {opacity: 0}
  to {opacity: 0.7}
}

.user_background{
  height: v-bind(height / 5 + 'px')
}

.picture_background{
  z-index: 0;
  position: absolute;
  top: 45px;
  left: v-bind(width / 11 - 1 + 'px');
  right: v-bind(width / 11 + 32 + 'px');
  height: v-bind(height / 5 + 'px');
  animation:myFirst 1s;
  opacity: 0.8;
}

.user_profile{
  z-index: 1;
  position: absolute;
  left: v-bind(width / 11 + 20 + 'px');
  top: v-bind(height / 10 + 45 + 'px');
  height: 50px;
  width: 50px;
  border-radius: 50px;
  border: 2px solid yellow;
  cursor: pointer;
}

.mask {
  z-index: 2;
  background-color: #000000;
  height: 50px;
  width: 50px;
  opacity: 0.7;
  color: white;
  font-size: 10px;
}

.user_name {
  z-index: 2;
  color: white;
  position: absolute;
  left: v-bind(width / 11 + 85 + 'px');
  top: v-bind(height / 10 + 50 + 'px');
  font-weight: bold;
}

</style>