<script setup lang="ts">
import Login from "~/components/login.vue";
import {useWindowStore} from "~/stores/window";
import { throttle } from 'lodash';
import {computed, onMounted, onUnmounted, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "~/stores/user";
import {ArrowRightBold, Message, Pointer, Setting, Star, SwitchButton} from "@element-plus/icons-vue";
import {ElMessage, ElNotification} from "element-plus";
import {request} from "~/utils/request";

// const props = defineProps<{
//   pageIndex: string
//   ifFixed: boolean
// }>()

const router = useRouter()
const route = useRoute()
const windows = useWindowStore()
const user = useUserStore()
const windowWidth = windows.width

const choice = ref(["我要买车","我要卖车","加入我们","个人主页"])
const menus = ref([{is : false, path: "/home"},
  {is : false, path: "/buy"},
  {is : false, path: "/sell"},
  {is : false, path: "/pay"},
  {is : false, path: "/user"}])

const isShow = computed(() => windows.scrollPositionY >= 1)
const loginShow = ref(false)
const registerShow = ref(false)
const loginInfo = ref(false)
const loginClick = ref(false)
const login_position = computed(()=> windowWidth - 427.5)
const registerIf = ref(false)

const moveToLogin = () =>{
  loginInfo.value = true
  window.addEventListener('mousemove',throttledHandle)
}

const clickProfile = () => {
  loginClick.value = true
  window.addEventListener('mousemove',throttledHandle1)
}

const mouseHandle = (event : MouseEvent) => {
  const x = event.clientX
  const y = event.clientY
  const t = login_position.value
  if(!(y >= 0 && y <= 45 && x >= t - 30 && x <= t + 30 || y >= 45 && y <= 210 && x >= t - 130 && x <= t + 130)){
    loginInfo.value = false
    window.removeEventListener('mousemove',throttledHandle)
  }
}

const throttledHandle = throttle(mouseHandle, 100);

const mouseHandle1 = (event : MouseEvent) => {
  const x = event.clientX
  const y = event.clientY
  const t = login_position.value - 15
  if(!(y >= 0 && y <= 90 && x >= t - 35 && x <= t + 35 || y >= 45 && y <= 290 && x >= t - 110 && x <= t + 110)){
    loginClick.value = false
    window.removeEventListener('mousemove',throttledHandle1)
  }
}

const throttledHandle1 = throttle(mouseHandle1, 100);

const login = () => {
  loginInfo.value = false
  window.removeEventListener('mousemove',throttledHandle)
  loginShow.value = true
}

const register = () => {
  loginInfo.value = false
  window.removeEventListener('mousemove',throttledHandle)
  loginShow.value = true
  registerShow.value = true
}

const setRegister = () => {
  registerShow.value = false
}

const exit = () =>{
  user.id = -1;
  user.phone = user.username = user.autoGraph = user.profile = ''
  request({
    url: '/logout',
    method: 'POST',
    params: {
      phone: localStorage.getItem("phone")
    }
  }).then((res) => {
    localStorage.removeItem("phone")
  }).catch((err) => {
    console.log(err)
  })
  loginClick.value = false
  window.removeEventListener('mousemove',throttledHandle1)
  router.push('/')
}

const routerTo = (num : number) => {
  if(num == 4 && user.id == -1){
    ElNotification({
      title: '您尚未登录',
      message: '请先登录',
      type: 'error',
      duration: 1000,
    })
    loginShow.value = true
  }else {
    router.push(menus.value[num].path)
    document.documentElement.scrollTop = 0
  }
}

const pathChoice = () =>{
  const path = route.path
  const path_split = path.split('/')
  let i : number;
  for (i = 0;i < 5;i++){
    menus.value[i].is = path_split[1] == menus.value[i].path.substring(1);
  }
  if(route.path == '/user/settings/password' || route.path == '/user/settings/password/'){
    request({
      url: '/user/ifPassword',
      method: 'GET',
      params: {
        phone : localStorage.getItem("phone")
      }
    }).then((res) => {
      if(!res.data){
        router.back()
        ElMessage.error("您还未设置密码")
        registerIf.value = true
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}

const session = () => {
  if(localStorage.getItem("phone") == null)
    return
  else {
    request({
      url: '/session',
      method: 'POST',
      params: {
        phone : localStorage.getItem("phone")
      }
    }).then((res) => {
      user.fetch()
    }).catch((err) => {
      console.log(err)
    })
  }
}

const cancelLogin = (show: boolean) =>{
  loginShow.value = false
  registerIf.value = show
}

watch(route,() => {
  pathChoice()
})

onMounted(() =>{
  // localStorage.clear()
  // let i : number;
  // for (i = 0;i < 5;i++){
  //   if (props.pageIndex == menus.value[i].path){
  //     menus.value[i].is = true
  //   }
  // }
  pathChoice()
  window.addEventListener('scroll', windows.handleScroll);
  session()
})
onUnmounted(() => {
  window.removeEventListener('scroll', windows.handleScroll);
});
</script>

<template>
<!--  <div class="user_menu" :class="{fix : props.ifFixed}" v-if="isShow">-->
  <div class="user_menu" :class="{fix : isShow}">
    <div class="menu_brand">
        <img src="../../public/pictures/trademark.png" height="45" alt="wrong.png">
    </div>
    <div class="menu menu_first" :class="{menu_active: menus[0].is}" @click="routerTo(0)">
      <span>首页</span>
    </div>
    <template v-for="(menu, index) in choice">
      <div class="menu" :class="{menu_active: menus[index + 1].is}" @click="routerTo(index + 1)">
        <span>{{menu}}</span>
      </div>
    </template>
    <div class="menu_login"  v-if="user.id == -1" @mouseenter="moveToLogin" @click="login">
      <div class="menu_login_font">
          登录
      </div>
    </div>
    <el-image class="menu_login" @mouseenter="clickProfile" :class="{menu_login_active : loginClick}" v-if="user.id != -1" @click="router.push('/user')" :src="user.profile">
    </el-image>
    <div class="menu_phone">
       <span>
           联系我们： 15971989001
        </span>
    </div>
  </div>
  <div class="user_menu" v-if="isShow">
  </div>
  <div class="login_info" v-if="loginInfo">
    <p>登录后你可以：</p>
    <div class="login_info_line">
      <div class="login_info_icon">
        <el-icon style="color: #f9c022"><Star /></el-icon>
      </div>
      <div class="login_info_text">
        <span>收藏/取消车辆</span>
      </div>
      <div class="login_info_icon" style="margin-left: 30px">
        <el-icon style="color: #f9c022"><Pointer /></el-icon>
      </div>
      <div class="login_info_text">
        <span>查看/发布评论</span>
      </div>
    </div>
    <div class="login_info_button" @click="login">
      <span>立刻登录</span>
    </div>
    <div class="login_info_bottom">
      <span>首次使用？</span>
      <span style="color: #f9c022" @click="register">点我注册</span>
    </div>
  </div>
  <div class="login_profile" v-if="loginClick">
    <div class="login_profile_title">
      <span>{{user.username}}</span>
    </div>
    <div class="login_profile_menu" style="margin-top: 13px" @click="router.push('/user')">
      <el-icon style="color: #f0a03c;" class="login_profile_menu_suffix"><Star /></el-icon>
      <div class="login_profile_menu_text">我的收藏</div>
      <el-icon class="login_profile_menu_last"><ArrowRightBold /></el-icon>
    </div>
    <div class="login_profile_menu" @click="router.push('/user/records')">
      <el-icon style="color: #f97499;" class="login_profile_menu_suffix"><Message /></el-icon>
      <div class="login_profile_menu_text">我的信息</div>
      <el-icon class="login_profile_menu_last"><ArrowRightBold /></el-icon>
    </div>
    <div class="login_profile_menu" @click="router.push('/user/settings')">
      <el-icon style="color: #25b5d9" class="login_profile_menu_suffix"><Setting /></el-icon>
      <div class="login_profile_menu_text">我的设置</div>
      <el-icon class="login_profile_menu_last"><ArrowRightBold /></el-icon>
    </div>
    <div class="login_profile_menu_bottom">
      <div class="login_profile_menu" style="margin: 8px 5px;color: #9ba3af;" @click="exit">
        <el-icon class="login_profile_menu_suffix"><SwitchButton /></el-icon>
        <div class="login_profile_menu_text">退出登录</div>
      </div>
    </div>
  </div>

  <Login ref="loginInformation" :login-show="loginShow" :register-show="registerShow" @cancel-login="cancelLogin" @set-register="setRegister"/>
  <RegisterForm :dialog-visible="registerIf" @cancel="registerIf = false"/>
</template>

<style scoped>
.user_menu{
  display: flex;
  height: 45px;
  padding-left: v-bind(windowWidth / 10 + 'px');
}

@keyframes myFirst
{
  from {opacity: 0; top: -30px}
  to {opacity: 1; top: 0}
}

.fix{
  z-index: 990;
  box-sizing: border-box;
  width: v-bind(windowWidth + 'px');
  position: fixed;
  background: white;
  animation: myFirst 0.5s;
}

.menu_brand{
  width: v-bind(windowWidth / 10 + 'px');
}

.menu{
  box-sizing : border-box;
  width: v-bind(windowWidth / 15 + 'px');
  margin: 4px 5px;
  padding: 10px 20px;
  text-align: center;
  color: #2a2c37;
  font-size: 12px;
}

.menu_first{
  margin-left: v-bind(windowWidth / 15 + 'px');
}

.menu_active{
  font-weight: bold;
  border-bottom: 2px solid #21ba45;
}

.menu:hover{
  font-weight: bold;
  border-bottom: 2px solid #21ba45;
}

.menu_login{
  z-index: 989;
  position: fixed;
  right: 400px;
  background: #f9c022;
  width: 35px;
  height: 35px;
  margin-top: 7px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  transition-property: all;
  transition-duration: 0.8s;
}

.menu_login_active{
  margin-top: 25px;
  width: 65px;
  height: 65px;
  transition-property: all;
  transition-duration: 0.8s;
}

.menu_login_font{
  font-size: 12px;
  color: #f0f9fe;
  padding-top: 9px;
}

.menu_phone{
  position: fixed;
  top: 4px;
  right: 120px;
  box-sizing : border-box;
  width: 200px;
  padding: 10px 20px;
  font-size: 12px;
}

.login_info{
  z-index: 990;
  position: fixed;
  top: 60px;
  left: v-bind(login_position - 130 + 'px');
  width: 260px;
  height: 150px;
  background: white;
  border-radius: 5px;
  cursor: pointer;
}

.login_info p{
  text-indent:15px;
  font-size: 13px;
}

.login_info span{
  font-size: 12px;
}

.login_info_line{
  display: flex;
  margin: 0 15px;
  height: 18px;
}

.login_info_icon{
  margin-top: 2px;
}

.login_info_text{
  margin-left: 2px;
}

.login_info_button{
  box-sizing : border-box;
  margin: 15px 16px 5px;
  height: 30px;
  background: #f9c022;
  border-radius: 5px;
  text-align: center;
  padding-top: 5px;
}

.login_info_button span{
  color: #f0f9fe;
}

.login_info_bottom{
  margin: 10px 16px;
  text-align: center;
}

.login_info_bottom span{
  font-size: 11px;
}

.login_profile{
  z-index: 99;
  position: fixed;
  top: 60px;
  left: v-bind(login_position - 125 + 'px');
  width: 220px;
  height: 225px;
  background: white;
  border-radius: 5px;
  cursor: pointer;
}

.login_profile_title{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 32px;
  font-size: 16px;
}

.login_profile_menu{
  display: flex;
  position: relative;
  margin: 4px 15px;
  height: 32px;
  border-radius: 8px;
  color: #61666d;
  background: white;
}

.login_profile_menu_suffix{
  margin-top: 7px;
  margin-left: 5px;
  font-size: 18px;
}

.login_profile_menu_text{
  margin-top: 8px;
  margin-left: 10px;
  font-size: 12px;
  color: black;
}

.login_profile_menu_last{
  position: absolute;
  right: 15px;
  top: 11px;
  font-size: 11px;
}

.login_profile_menu:hover{
  background: rgba(227, 229, 231, 0.8);
}

.login_profile_menu_bottom{
  margin: 8px 10px 0;
  border-top: 1px solid #b8babb;
}
</style>
