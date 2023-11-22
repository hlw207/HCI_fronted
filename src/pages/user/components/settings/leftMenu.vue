<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {House, Key, Phone, User} from "@element-plus/icons-vue";
import {useRoute, useRouter} from "vue-router";

const route = useRoute()
const router = useRouter()

const menus = ref([
  {is: false, path: '/user/settings', name: '个人信息'},
  {is: false, path: '/user/settings/profile', name: '头像修改'},
  {is: false, path: '/user/settings/phone', name: '换绑手机'},
  {is: false, path: '/user/settings/password', name: '密码修改'}
])

const pathChoice = () => {
  const path = route.path
  let i: number;
  for (i = 0; i < 4; i++) {
    menus.value[i].is = path == menus.value[i].path;
  }
}

const routerTo = (index : number) =>{
  router.push(menus.value[index].path)
}

watch(route,() => {
  pathChoice()
})

onMounted(() => {
  pathChoice()
})
</script>

<template>
  <div class="left_menu">
    <div class="left_menu_main">
      <template v-for="(menu, index) in menus">
        <div class="menu" :class="{menu_active : menu.is}" @click="routerTo(index)">
          <div class="menu_icon">
            <el-icon v-if="index == 0"><House /></el-icon>
            <el-icon v-if="index == 1"><User /></el-icon>
            <el-icon v-if="index == 2"><Phone /></el-icon>
            <el-icon v-if="index == 3"><Key /></el-icon>
          </div>
          {{menu.name}}
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.left_menu{
  margin-top: 60px;
  width: 120px;
}

.left_menu_main{
  width: 100%;
  border: 1px solid rgba(128, 128, 128, 0.25);
}

.menu_icon{
  padding-top: 4px;
  margin-right: 8px;
  font-size: 14px;
  color: #cacaca;
}

.menu{
  display: flex;
  justify-content:center;
  align-items:center;
  background: #fafafa;
  padding: 10px 0;
  font-size: 12px;
  cursor: pointer;
}

.menu:hover{
  background: rgba(155, 163, 175, 0.2);
}

.menu_active{
  background: #22a1d6;
  color: white;
}

.menu_active .menu_icon{
  color: white;
}

.menu_active:hover{
  background: #22a1d6;
}

</style>