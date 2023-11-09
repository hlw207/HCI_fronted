<script setup lang="ts">
import Login from "~/components/login.vue";
import {useWindowStore} from "~/stores/window";
import { throttle } from 'lodash';
import {computed, onMounted, onUnmounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useUserStore} from "~/stores/user";
import {Pointer, Star} from "@element-plus/icons-vue";


const props = defineProps<{
  pageIndex: string
  ifFixed: boolean
}>()

const router = useRouter()
const windows = useWindowStore()
const user = useUserStore()
const windowWidth = windows.width
const windowHeight = windows.height

const choice = ref(["我要买车","我要卖车","功能待定","个人主页"])
const menus = ref([{is : false, path: "/"},
  {is : false, path: "/buy"},
  {is : false, path: "/copy"},
  {is : false, path: "/pay"},
  {is : false, path: "/user"}])

const isShow = computed(() => !props.ifFixed || windows.scrollPositionY >= 45)
const loginShow = ref(false)
const registerShow = ref(false)
const loginInfo = ref(false)
const login_position = computed(()=> 2 * windowWidth / 3 + 10 * 5 + 17)

const moveToLogin = () =>{
  loginInfo.value = true
  window.addEventListener('mousemove',throttledHandle)
}

const mouseHandle = (event) => {
  const x = event.clientX
  const y = event.clientY
  const t = login_position.value
  if(!(y >= 0 && y <= 45 && x >= t - 30 && x <= t + 30 || y >= 45 && y <= 210 && x >= t - 130 && x <= t + 130)){
    loginInfo.value = false
    window.removeEventListener('mousemove',throttledHandle)
  }
}

const throttledHandle = throttle(mouseHandle, 100);

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

const routerTo = (num : number) => {
  router.push(menus.value[num].path)
}

onMounted(() =>{
  let i : number;
  for (i = 0;i < 5;i++){
    if (props.pageIndex == menus.value[i].path){
      menus.value[i].is = true
    }
  }
  window.addEventListener('scroll', windows.handleScroll);

})

onUnmounted(() => {
  window.removeEventListener('scroll', windows.handleScroll);
});
</script>

<template>
  <div class="user_menu" :class="{fix : props.ifFixed}" v-if="isShow">
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
    <div class="menu_login">
      <div class="menu_login_font" v-if="user.id === ''" @mouseenter="moveToLogin" @click="login">登录</div>
    </div>
    <div class="menu_phone">
       <span>
           联系我们： 15971989001
        </span>
    </div>
  </div>
  <div class="login_info" v-if="loginInfo" @mouseleave="loginInfo = false">
    <p>登录后你可以：</p>
    <div class="login_info_line">
      <div class="login_info_icon">
        <el-icon style="color: #26aeea"><Star /></el-icon>
      </div>
      <div class="login_info_text">
        <span>收藏/取消车辆</span>
      </div>
      <div class="login_info_icon" style="margin-left: 30px">
        <el-icon style="color: #26aeea"><Pointer /></el-icon>
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
      <span style="color: #26aeea" @click="register">点我注册</span>
    </div>
  </div>
  <Login ref="loginInformation" :login-show="loginShow" :register-show="registerShow" @cancel-login="loginShow=false" @set-register="setRegister"/>
</template>

<style scoped>
.user_menu{
  display: flex;
  height: 45px;
  background: #fcfcfc;
  padding-left: v-bind(windowWidth / 10 + 'px');
}

.fix{
  width: v-bind(windowWidth + 'px');
  position: fixed;
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
  background: #26aeea;
  width: 35px;
  height: 35px;
  margin-top: 7px;
  margin-left: v-bind(windowWidth / 15 + 'px');
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
}

.menu_login_font{
  font-size: 12px;
  color: #f0f9fe;
  padding-top: 9px;
}

.menu_phone{
  box-sizing : border-box;
  width: v-bind(windowWidth / 5 + 'px');
  margin: 4px 60px;
  padding: 10px 20px;
  font-size: 12px;
}

.login_info{
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
  background: #26aeea;
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
</style>