<script setup lang="ts">
import UserSettingsProfile from "~/pages/user/components/settings/userSettingsProfile.vue";
import UserSettingInfo from "~/pages/user/components/settings/userSettingInfo.vue";
import LeftMenu from "~/pages/user/components/settings/leftMenu.vue";
</script>

<template>
  <div class="user_main">
    <div class="user_settings">
      <LeftMenu />
      <UserSettingsProfile />
    </div>
  </div>
</template>

<route lang="yaml">
  meta:
    layout: user
</route>

<style scoped>
.user_main{
  margin-top: 0;
  padding: 0;
  height: 450px;
  background: white;
}

.user_settings{
  display: flex;
  height: 400px;
}
</style>