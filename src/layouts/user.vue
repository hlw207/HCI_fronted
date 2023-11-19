<script setup lang="ts">
import {useWindowStore} from "~/stores/window";
import UserBack from "~/pages/user/components/userBack.vue";
import UserDetailMenu from "~/pages/user/components/userDetailMenu.vue";
import {onMounted} from "vue";
import {useUserStore} from "~/stores/user";
import {useRouter} from "vue-router";

const window = useWindowStore()
const user = useUserStore()
const router = useRouter()
const width = window.width
const height = window.height - 45

onMounted(() =>{
  if(user.id == null){
    router.go(-1)
  }
})
</script>

<template>
  <RightSide />
  <UserMenu />
  <div class="user">
    <UserBack />
    <UserDetailMenu />
    <router-view></router-view>
  </div>
</template>

<style scoped>
.user{
  height: v-bind(height + 'px');
  padding-left: v-bind(width / 11 + 'px');
  padding-right: v-bind(width / 11 + 32 + 'px');
  background: #f4f5f7;
}
</style>
