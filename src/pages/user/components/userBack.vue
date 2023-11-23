<script setup lang="ts">
import {useWindowStore} from "~/stores/window";
import {useUserStore} from "~/stores/user";
import {ref} from "vue";
import {useRouter} from "vue-router";

const windows = useWindowStore()
const user = useUserStore()
const height = windows.height - 45
const router = useRouter()

const resize = ref(false)

const resizeStart = () =>{
  resize.value = true
}

const resizeEnd = () =>{
  resize.value = false
}
const resizeProfile = () =>{
  router.push('/user/settings/profile')
}

const addSignature = () =>{
  router.push('/user/settings')
}

</script>

<template>
  <div class="user_background">
      <el-image class="picture_background" src="../../../public/pictures/user_background.png"></el-image>
      <el-image class="user_profile" :src="user.picture"></el-image>
      <div v-if="resize" class="user_profile mask">
        <div style="margin-top: 17px;margin-left: 5px">
          <span>修改头像</span>
        </div>
      </div>
      <div class="user_profile" style="z-index: 4" @mouseenter="resizeStart" @mouseleave="resizeEnd" @click="resizeProfile"></div>
      <div class="user_name">{{user.username}}</div>
      <div class="signature" v-if="user.autoGraph != ''">个性签名： {{user.autoGraph}}</div>
      <div class="signature" v-if="user.autoGraph == ''">
        <div class="signature_add" @click="addSignature">
          点击添加个性签名
        </div>
      </div>
  </div>
</template>

<style scoped>
@keyframes myFirst
{
  from {opacity: 0}
  to {opacity: 0.75}
}

@keyframes showOut
{
  from {opacity: 0}
  to {opacity: 0.7}
}

.user_background{
  position: relative;
  height: v-bind(height / 5 + 'px');
}

.picture_background{
  z-index: 0;
  position: absolute;
  height: v-bind(height / 5 + 'px');
  width: 100%;
  animation:myFirst 1s;
  opacity: 0.75;
}

.user_profile{
  z-index: 2;
  position: absolute;
  left: 20px;
  top: v-bind(height / 5 - 70 + 'px');
  height: 50px;
  width: 50px;
  border-radius: 50px;
  border: 2px solid yellow;
  cursor: pointer;
}

.mask {
  z-index: 3;
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
  left: 85px;
  top: v-bind(height / 5 - 65 + 'px');
  font-weight: bold;
}

.signature{
  z-index: 2;
  color: white;
  position: absolute;
  left: 85px;
  top: v-bind(height / 5 - 36 + 'px');
  font-size: 12px;
}

.signature_add{
  font-size: 11px;
  color: #92d6f4;
  cursor: pointer;
}
</style>