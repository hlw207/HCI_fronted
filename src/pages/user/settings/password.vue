<script setup lang="ts">
import LeftMenu from "~/pages/user/components/settings/leftMenu.vue";
import {useWindowStore} from "~/stores/window";
import UserSettingPassword from "~/pages/user/components/settings/userSettingPassword.vue";

const window = useWindowStore()
const width = window.width
const height = window.height - 45
</script>

<template>
  <div class="user">
    <div class="user_main">
      <div class="user_settings">
        <LeftMenu />
        <UserSettingPassword />
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
  meta:
    layout: user
</route>

<style scoped>
.user{
  height: v-bind(height - height / 5 - 54 + 'px');
  margin-right: 32px;
  padding: 0 v-bind(width / 11 + 'px');
  background: #f7f4f5;
}

.user_main{
  margin-top: 0;
  padding: 0;
  height: 450px;
  background: white;
}

.user_settings{
  display: flex;
  height: 400px;
  animation: myFirst 0.5s;
}

@keyframes myFirst
{
  0% {
    margin-left: -50px;
    opacity: 0;
  }
  100% {
    margin-left: 0;
    opacity: 1;
  }
}
</style>