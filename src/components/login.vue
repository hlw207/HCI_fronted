<script setup lang="ts">
import {useWindowStore} from "~/stores/window";
import {Close} from "@element-plus/icons-vue";
import {computed, reactive, ref, watch} from "vue";
import {ElMessage, ElNotification} from "element-plus";
import {useUserStore} from "~/stores/user";
import {request} from "~/utils/request";
import {PICTURE_ADDR} from "~/config";

const windows = useWindowStore()
const user = useUserStore()
const windowWidth = windows.width
const windowHeight = windows.height

const download = ref(false)
const isLogin = ref(true)
const timer = ref()
const time = ref(10)
const count = ref(false)
const code = ref('')

const information = reactive({
  info : '',
  password : '',
  phone: '',
  code: ''
})

const isCanLogin = computed(() => information.info!= ''&& information.password != '')

const props = defineProps<{
  loginShow: boolean
  registerShow: boolean
}>()

const emits = defineEmits(['cancelLogin','setRegister'])

const sendCode = () => {
  const phonePattern = /^1\d{10}$/;
  if(!phonePattern.test(information.phone)){
    ElMessage({
      message: '手机号格式错误',
      type: 'warning',
    })
    return
  }
  code.value = user.gainCode()
  ElNotification({
    title: '验证码',
    message: '验证码为' + code.value,
    type: 'success',
    duration: 20000
  })
  count.value = true
  timer.value = setInterval(() => {
    if (time.value == 0) {
      clearInterval(timer.value);
      count.value = false
      time.value = 10
    } else {
      time.value--
    }
  }, 1000)
}

const login = () => {
  if(information.info == ''){
    ElMessage.error('账号/手机号未输入')
  }
  else if(information.password == ''){
    ElMessage.error('密码未输入')
  }
  else{
    // user.id = 0;
    request({
      url: '/login',
      method: 'POST',
      params:{
        info: information.info,
        password: information.password
      }
    }).then((res) => {
      localStorage.setItem("phone", res.data)
      user.fetch()
      ElMessage.success('登录成功')
    }).catch((err) => {
      localStorage.removeItem("info")
      console.log(err)
      ElMessage.error('账号或密码错误')
    })
    clear()
    emits('cancelLogin', false)
  }
}

const register = () => {
  const phonePattern = /^1\d{10}$/;
  if(!phonePattern.test(information.phone)){
    ElMessage({
      message: '手机号格式错误',
      type: 'warning',
    })
    return
  }
  if(code.value != information.code || code.value == ''){
    ElMessage({
      message: '验证码错误',
      type: 'warning',
    })
    return
  }
  localStorage.setItem("phone", information.phone)
  request({
    url: '/loginPhone',
    method: 'POST',
    params: {
      phone: information.phone
    }
  }).then((res) => {
    user.fetch()
    ElMessage.success('登录成功')
  }).catch((err) => {
    localStorage.removeItem("phone")
    console.log(err)
    ElMessage.error('登录/注册错误')
  })
  clear()
  setTimeout(()=>{
    if(user.username == '')
      emits('cancelLogin', true)
    else
      emits('cancelLogin',false)
  }, 1)
}
const clear = () => {
  isLogin.value = true
  information.info = information.password = information.phone = information.code = ''
  code.value = ''
}

const exit = () =>{
  clear()
  emits('cancelLogin',false)
}

watch(props,()=>{
  if(props.registerShow) {
    isLogin.value = !props.registerShow
    emits('setRegister')
  }
})
</script>

<template>
  <div>
    <div class="login" v-if="loginShow">
      <div class="cancel_login">
        <el-icon size="20px" @click="exit"><Close /></el-icon>
      </div>
      <div class="login_main">
        <div class="login_main_left">
          <div class="login_main_left_top">
            <span>扫描二维码登录</span>
          </div>
          <div class="login_main_left_main">
            <div class="login_main_left_main_top">
              <el-image :src="PICTURE_ADDR + '/download.png'" style="height: 145px;width: 145px" v-if="download"></el-image>
              <el-image :src="PICTURE_ADDR + '/login.png'" style="height: 145px;width: 145px" v-else></el-image>
            </div>
            <div class="login_main_left_main_bottom">
              <div>
                <span>请使用&nbsp;</span>
                <span style="color: #f2711c;cursor: pointer" @mouseenter="download=true" @mouseleave="download=false">赛赛二手车客户端</span>
              </div>
              <div style="margin-top: 2px">
                <span>扫码登录或扫码下载APP</span>
              </div>
            </div>
          </div>
        </div>
        <div class="login_main_right">

          <div class="login_main_right_up">
            <div class="login_main_right_up_left" :class="{login_main_right_up_color: isLogin}">
              <span @click="isLogin=true">密码登录</span>
            </div>
            <div class="login_main_right_up_right" :class="{login_main_right_up_color: !isLogin}">
              <span @click="isLogin=false">短信登录</span>
            </div>
          </div>

          <div class="login_main_right_up_main" v-if="isLogin">
            <div class="input_up">
              <div style="margin: 13px 20px"><span>账号</span></div>
              <input class="input_input" type="text" v-model="information.info" placeholder="请输入账号 / 手机号">
            </div>
            <div class="input_down">
              <div style="margin: 13px 20px"><span>密码</span></div>
              <input class="input_input" type="password" v-model="information.password" placeholder="请输入密码">
              <div style="margin-top: 14px;margin-left: 4px">
                <span style="font-size: 12px;color: #f2711c;cursor: pointer">忘记密码？</span>
              </div>
            </div>
          </div>

          <div class="login_main_right_up_down" v-if="isLogin">
            <div class="login_button_register"  @click="isLogin=false">
              <span>
                 注册
             </span>
            </div>
            <div class="login_button_login" :class="{can_login : isCanLogin}" @click="login">
              <span>
                 登录
             </span>
            </div>
          </div>

          <div class="login_main_right_up_main" v-if="!isLogin">
            <div class="input_up">
              <div style="margin: 16px 35px 0 20px"><span>+86</span></div>
              <input class="input_input" type="text" v-model="information.phone" placeholder="请输入手机号">
              <div style="margin-top: 14px;margin-left: 4px">
                <span v-if="!count" style="font-size: 12px;color: #f2711c;cursor: pointer" @click="sendCode">获取验证码</span>
                <span v-if="count" style="font-size: 12px;color: #9ba3af">{{time}}s后重新获取</span>
              </div>
            </div>
            <div class="input_down">
              <div style="margin: 13px 20px"><span>验证码</span></div>
              <input class="input_input" type="password" v-model="information.code" placeholder="请输入验证码">
            </div>
          </div>

          <div class="login_main_right_up_down" v-if="!isLogin" @click="register">
            <div class="login_button_login_register">
              <span>
                 登录/注册
             </span>
            </div>
          </div>

          <div class="login_extra_login">
            <div>
              <span style="color: #9499a0">其他方式登录</span>
            </div>
            <div style="display: flex">
              <div class="login_extra_login_box" style="margin-left: 110px">
                <el-image :src="PICTURE_ADDR + '/Wechat.png'" style="width: 30px;height: 30px"></el-image>
                <div style="margin-top: 8px;margin-left: 6px">
                  <span style="color: #9499a0">微信登录</span>
                </div>
              </div>
              <div class="login_extra_login_box" style="margin-left: 45px">
                <el-image :src="PICTURE_ADDR + '/QQ.png'" style="width: 30px;height: 30px"></el-image>
                <div style="margin-top: 8px;margin-left: 6px">
                  <span style="color: #9499a0">QQ登录</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="login_tips">
        <div style="margin-top: 2px">
          <span style="color: #a4a4a4">未注册过赛赛二手车的手机号，我们将自动帮您注册账号</span>
        </div>
        <div>
          <span style="color: #a4a4a4">登录或完成注册即代表你同意</span>
          <span style="color: #f2711c;font-weight: bold;cursor: pointer">&nbsp;用户协议</span>
          <span style="color: #a4a4a4">&nbsp;和&nbsp;</span>
          <span style="color: #f2711c;font-weight: bold;cursor: pointer">&nbsp;隐私政策</span>
        </div>
      </div>
      <div></div>
    </div>
    <div class="mask" v-if="loginShow"></div>
  </div>
</template>

<style scoped>
.login{
  z-index: 999;
  position: fixed;
  top: v-bind(windowHeight/2 - 180 + 'px');
  left: v-bind(windowWidth/2 - 350 + 'px');
  width: 700px;
  height: 360px;
  background: #ffffff;
  border-radius: 8px;
}

.cancel_login{
  position: absolute;
  top: 20px;
  right: 20px;
  color: black;
  cursor: pointer;
}

.mask {
  z-index: 998;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.5;
}

.login_main{
  display: flex;
  height: 300px;
  border-radius: 8px;
}

.login_main_left{
  width: 250px;
  border-radius: 8px;
}

.login_main_left_top{
  margin-left: 44px;
  margin-top: 40px;
  text-align: center;
  font-size: 16px;
  border-radius: 8px;
  color: #505050;
}

.login_main_left_main{
  margin-top: 10px;
  margin-left: 70px;
  height: 200px;
  border-right: 2px solid #e3e5e7;
}

.login_main_left_main_top{
  box-sizing: border-box;
  padding: 4px;
  height: 154px;
  margin-right: 25px;
  border-radius: 5px;
  border: 1px solid #e3e5e7;
}

.login_main_left_main_bottom{
  margin-top: 8px;
  margin-right: 25px;
  font-size: 11px;
  color: #505050;
  text-align: center;
}

.login_main_right{
  width: 450px;
}

.login_main_right_up{
  display: flex;
  margin-left: 40px;
  margin-right: 60px;
  margin-top: 40px;
  font-size: 16px;
}

.login_main_right_up_left{
  margin-left: 85px;
  width: 50%;
  padding-right: 20px;
  text-align: right;
  border-right: 1px solid #e3e5e7;
  color: #505050;
  cursor: pointer;
}

.login_main_right_up_right{
  margin-right: 85px;
  width: 50%;
  padding-left: 20px;
  text-align: left;
  border-left: 1px solid #e3e5e7;
  cursor: pointer;
}

.login_main_right_up_color{
  color: #f2711c;
  cursor: not-allowed;
}

.login_main_right_up_main{
  margin-left: 40px;
  margin-right: 60px;
  margin-top: 20px;
  height: 81px;
  font-size: 12px;
  border-radius: 8px;
  border: 1px solid #e3e5e7;
}

.input_up{
  display: flex;
  height: 40px;
  border-bottom: 1px solid #e3e5e7;
}

.input_down{
  display: flex;
  height: 40px;
}

.input_input{
  border: none;
  box-shadow:none;
  outline: none;
  margin-top: 5px;
  font-size: 12px;
  width: 180px;
}

.input_input::placeholder{
  color: #dddddd;
}

.login_main_right_up_down{
  display: flex;
  margin-left: 40px;
  margin-right: 60px;
  margin-top: 20px;
  height: 38px;
  font-size: 12px;
  border-radius: 8px;
}

.login_button_register{
  padding-top: 10px;
  margin-right: 10px;
  width: 50%;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #e3e5e7;
  cursor: pointer;
}

.login_button_login{
  padding-top: 10px;
  margin-left: 10px;
  width: 50%;
  border-radius: 8px;
  text-align: center;
  background: rgba(242, 113, 28, 0.7);
  color: white;
  border: 1px solid #e3e5e7;
  cursor: not-allowed;
}

.login_button_login_register{
  padding-top: 10px;
  margin-left: 25%;
  width: 50%;
  border-radius: 8px;
  text-align: center;
  background: #f2711c;
  color: white;
  border: 1px solid #e3e5e7;
  cursor: pointer;
}

.can_login{
  background: #f2711c;
  cursor: pointer;
}

.login_extra_login{
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 3px;
  height: 40px;
  text-align: center;
  font-size: 11px;
}

.login_extra_login_box{
  display: flex;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
}

.login_tips{
  box-sizing: border-box;
  height: 60px;
  border-radius: 8px;
  font-size: 11px;
  text-align: center;
}
</style>