<script setup lang="ts">
import {ref, watch} from "vue";
import {useUserStore} from "~/stores/user";
import {useRouter} from "vue-router";
import CertifyCode from "~/pages/sell/instruction/components/certifyCode/index.vue";
import {ElMessage, ElNotification} from "element-plus";
const user = useUserStore()
const phone = ref(user.phone)
const router= useRouter()

const agreement = ref(false)
const dialogTableVisible = ref(false)
const certifyPicCode = ref('')
const certifyPhoneCode = ref('')
const certifyPhoneMessage = ref('获取短信验证码')
const certifyCode = ref('')
const code = ref('')
const certifyGetable = ref(true)

watch(()=>user.phone,(val)=>{
  phone.value = val
})

const updateCertify = (certify: string) => {
  certifyCode.value = certify
}

const handleGetCertifyCode = () => {
  if (!certifyGetable.value){
    return
  }
  code.value = user.gainCode()
  ElNotification({
    title: '验证码',
    message: '验证码为' + code.value,
    type: 'success',
    duration: 20000
  })
  let timeCount = 10
  certifyGetable.value = false
  const timeInterval = setInterval(() => {
    timeCount--
    certifyPhoneMessage.value = String(timeCount) + '秒后重新获取'
    if(timeCount === 0){
      clearInterval(timeInterval)
      certifyPhoneMessage.value = '获取短信验证码'
      certifyGetable.value = true
    }
  },1000)
}

const handleCertificationSubmit = () => {
  if(!certifyPicCode.value){
    ElMessage.warning("请输入图形验证码")
  }else if(!certifyPhoneCode.value){
    ElMessage.warning("请输入验证码")
  }else {
    if(certifyPicCode.value != certifyCode.value)
      ElMessage.warning("图形验证码错误")
    else if(code.value == '')
      ElMessage.warning("未获取验证码")
    else if(certifyPhoneCode.value != code.value){
      ElMessage.warning("验证码错误")
    }else {
      router.push('/sell/form')
    }
  }
}

const show = () => {
    if (!agreement.value){
      ElMessage({
        message: '请先勾选同意条款',
        type: 'warning',
      })
    } else if(!phone.value){
      ElMessage({
        message: '请输入手机号',
        type: 'warning',
      })
    } else {
      const phonePattern = /^1\d{10}$/;
      if(!phonePattern.test(phone.value)){
        ElMessage({
          message: '手机号格式错误',
          type: 'warning',
        })
        return
      }
      if(user.id != -1&&user.phone == phone.value)
        router.push('/sell/form')
      dialogTableVisible.value = true
    }
}

watch(user,(()=>{
  if(phone.value != user.phone)
    phone.value = user.phone
}))
</script>

<template>
  <div class="sellContainer">
    <div class="sell_phone">
      <div class="sell_left">
        <input v-model="phone" class="sell_input" placeholder="请输入手机号">
      </div>
      <div class="sell_right" @click="show">卖车</div>
    </div>
    <div style="width: 100%;margin-left: -20px;margin-top: 5px;display: flex;flex-direction: row;justify-content: center;align-items: center">
      <el-checkbox style="margin-right: 10px" v-model="agreement"></el-checkbox>
      <span style="color: #b2b2b2;font-size: 12px">
              我已阅读并同意
          <el-link type="warning" style="font-size: 12px;margin-top: -5px">《用户使用协议》</el-link>及
          <el-link type="warning" style="font-size: 12px;margin-top: -5px">《隐私权条款》</el-link>
        </span>
    </div>
    <div class="sell_bottom" @click="router.push('/sell')">
      好车不和坏车卖 好车卖好价
    </div>
  </div>

  <el-dialog v-model="dialogTableVisible" width="30%" center top="20%">
    <div class="certifyContainer">
      <el-image src="/public/pictures/sell/certify.png" style="width: 60px;height: 60px;position: relative;top: -80px" />
      <div class="certifyPic">
        <el-input v-model="certifyPicCode" placeholder="请输入图片验证码" minlength="4" maxlength="4" clearable />
        <CertifyCode @update="updateCertify"/>
      </div>
      <div class="certifyCode">
        <el-input v-model="certifyPhoneCode" placeholder="请输入您收到的验证码" minlength="6" maxlength="6" clearable />
        <p style="color: #eda01f;width: 110px;height: 50px;margin-left: -110px;z-index: 1;cursor: pointer" @click="handleGetCertifyCode" text>{{certifyPhoneMessage}}</p>
      </div>
      <el-button color="#eda01f" style="width: 200px;color: white;height: 40px;margin-bottom: -10px" @click="handleCertificationSubmit">提交</el-button>
    </div>
  </el-dialog>
</template>


<style scoped>
.sellContainer{
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  padding-top: 50px;
}

.sell_phone{
  display: flex;
  margin-right: 30px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid rgba(128, 128, 128, 0.3);
}

.sell_left{
  width: 70%;
  border-radius:5px 0 0 5px;
  display: flex;
  align-items: center;
}

.sell_right{
  width: 30%;
  background: #f2711c;
  border-radius:0 5px 5px 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.sell_right:hover{
  background: #ee670f;
}

.sell_left:focus-within{
  outline: 1px solid #f2711c;
}

.sell_input{
  margin-left: 8px;
  width: 90%;
  height: 35px;
  border: none;
  box-shadow:none;
  outline: none;
}

.sell_input::placeholder{
  color: #9ba3af;
  font-size: 13px;
}

.sell_bottom{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-right: 30px;
  height: 50px;
  background: #e6e9fa;
  color: #353948;
  font-family: 黑体,serif;
  border-radius: 30px;
  font-size: 18px;
  letter-spacing: 0.3px;
  cursor: pointer;
}

.certifyContainer{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.certifyPic{
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: -50px;
  margin-bottom: 10px;
}

.certifyCode{
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
}
</style>
