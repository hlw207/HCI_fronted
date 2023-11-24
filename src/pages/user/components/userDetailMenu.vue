<script setup lang="ts">
import {useWindowStore} from "~/stores/window";
import {useRoute, useRouter} from "vue-router";
import {ref, onMounted, watch} from "vue";
import {Message, Setting, Star, SwitchButton} from "@element-plus/icons-vue";
import {useUserStore} from "~/stores/user";

const window = useWindowStore()
const width = window.width
const router = useRouter()
const route = useRoute()
const user = useUserStore()

const menus = ref([{is: false, path : '/user', name: '收藏'}
                        ,{is: false, path : '/user/comments', name: '评论'}
                        ,{is: false, path : '/user/settings', name: '设置'}])

const pathChoice = () =>{
  const path = route.path
  let i : number;
  for (i = 0;i < 3;i++){
    menus.value[i].is = path.substring(0, 14) == menus.value[i].path;
  }
}

const exit = () =>{
  user.id = -1;
  router.push('/')
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
      <div class="menu_exit" @click="exit">
        <el-icon class="menu_exit_icon"><SwitchButton /></el-icon>
        <div class="menu_exit_text">
          退出登录
        </div>
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
  color: #fa5c3d;
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

.menu_exit{
  display: flex;
  position: absolute;
  right: v-bind(width / 11 + 32 + 'px');
  margin: 10px 10px;
  height: 35px;
  width: 100px;
  cursor: pointer;
}

.menu_exit:hover{
  background: rgba(155, 163, 175, 0.1);
}

.menu_exit_icon{
  margin-top: 10px;
  margin-left: 10px;
  color: #9ba3af;
}

.menu_exit_text{
  margin-top: 9px;
  margin-left: 8px;
  color: #9ba3af;
  font-size: 13px;
}
</style>