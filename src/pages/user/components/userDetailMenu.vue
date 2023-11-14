<script setup lang="ts">
import {useWindowStore} from "~/stores/window";
import {useRoute, useRouter} from "vue-router";
import {ref, onMounted, watch} from "vue";
import {Message, Setting, Star} from "@element-plus/icons-vue";

const window = useWindowStore()
const router = useRouter()
const route = useRoute()
const height = window.height

const menus = ref([{is: false, path : '/user', name: '收藏'}
                        ,{is: false, path : '/user/comments', name: '评论'}
                        ,{is: false, path : '/user/settings', name: '设置'}])

const pathChoice = () =>{
  const path = route.path
  let i : number;
  for (i = 0;i < 3;i++){
    menus.value[i].is = path == menus.value[i].path;
  }
}

watch(route,() => {
  pathChoice()
})

onMounted(() => {
  pathChoice()
})
</script>

<template>
  <div class="user_menu">
      <div class="menu_box" :class="{active_menu_box: menus[0].is}" @click="router.push(menus[0].path)">
          <el-icon class="menu_icon" style="color: #f0a03c;"><Star /></el-icon>
          <div class="menu_font"><span>收藏</span></div>
      </div>
      <div class="menu_box" :class="{active_menu_box: menus[1].is}" @click="router.push(menus[1].path)">
          <el-icon class="menu_icon" style="color: #f97499;"><Message /></el-icon>
          <div class="menu_font"><span>评论</span></div>
      </div>
      <div class="menu_box" :class="{active_menu_box: menus[2].is}"  @click="router.push(menus[2].path)">
          <el-icon class="menu_icon" style="color: #25b5d9"><Setting /></el-icon>
          <div class="menu_font"><span>设置</span></div>
      </div>
  </div>
</template>

<style scoped>
.user_menu{
  display: flex;
  height: 55px;
  background: white;
}

.menu_box {
  display: flex;
  margin-left: 15px;
  margin-right: 15px;
}

.menu_box:hover{
  color: #26aeea;
  border-bottom: 3px solid #26aeea;;
}

.active_menu_box{
  color: #26aeea;
  border-bottom: 3px solid #26aeea;;
}

.menu_icon{
  font-size: 15px;
  margin-top: 21px;
  margin-right: 3px;
}

.menu_font{
  font-size: 12px;
  margin-top: 20px;
}

</style>