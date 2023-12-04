<script setup lang="ts">
import {useWindowStore} from "~/stores/window";
import UserBack from "~/pages/user/components/userBack.vue";
import UserDetailMenu from "~/pages/user/components/userDetailMenu.vue";
import {onMounted} from "vue";
import {useUserStore} from "~/stores/user";
import {useRouter} from "vue-router";
import LeftMenu from "~/pages/user/components/settings/leftMenu.vue";

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
    <div class="user1">
      <div class="user_main">
        <div class="user_settings">
          <LeftMenu />
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user{
  margin-right: 32px;
  padding: 0 v-bind(width / 11 + 'px');
  background: #f7f4f5;
}

.user1{
  height: v-bind(height - height / 5 - 54 + 'px');
  margin-right: 32px;
  padding: 0 v-bind(width / 11 + 'px');
  background: #f7f4f5;
}

.user_main{
  margin: 0;
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
