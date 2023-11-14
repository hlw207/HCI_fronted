<script setup lang="ts">
import {useWindowStore} from "~/stores/window";
import Right_side from "~/components/rightSide.vue";
import UserBack from "~/pages/user/components/userBack.vue";
import UserDetailMenu from "~/pages/user/components/userDetailMenu.vue";

const window = useWindowStore()
const width = window.width
const height = window.height - 45

</script>

<template>
  <Right_side />
  <div class="user">
    <UserBack />
    <UserDetailMenu />

    <div class="user_main">
      123
    </div>
  </div>
</template>

<style scoped>
.user{
  height: v-bind(height + 'px');
  padding-left: v-bind(width / 11 + 'px');
  padding-right: v-bind(width / 11 + 32 + 'px');
  background: #f4f5f7;
  text-align: right;
}

.user_main{
  margin-top: 15px;
  height: 500px;
  background: white;
}
</style>