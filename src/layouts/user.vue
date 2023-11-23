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
  <div style="background : #f7f4f5">
    <div class="user">
      <UserBack />
      <UserDetailMenu />
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.user{
  margin-right: 32px;
  padding: 0 v-bind(width / 11 + 'px');
  background: #f7f4f5;
}
</style>
