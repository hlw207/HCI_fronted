<script setup lang="ts">
import {useWindowStore} from "~/stores/window";
import Right_side from "~/components/rightSide.vue";
import UserBack from "~/pages/user/components/userBack.vue";
import UserDetailMenu from "~/pages/user/components/userDetailMenu.vue";
import UserSettingsProfile from "~/pages/user/components/settings/userSettingsProfile.vue";

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
      <div class="user_settings">
        <UserSettingsProfile />
      </div>
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
  margin-top: 30px;
  height: 520px;
  background: white;
}

.user_settings{
  display: flex;
  padding-top: 40px;
  margin-left: 20px;
  margin-right: 20px;
  height: 400px;
}
</style>