<script setup lang="ts">

import {ref} from "vue";
import {useUserStore} from "~/stores/user";
import {ElMessage, ElNotification} from "element-plus";
import {request} from "~/utils/request";

const user = useUserStore()
const active = ref(0)
const time = ref(10)
const timer = ref()
const count = ref(false)
const phone = ref()
const code = ref()
const Code = ref('')
const sendCode = () =>{
  if(active.value == 1){
    const phonePattern = /^1\d{10}$/;
    if(!phonePattern.test(phone.value)){
      ElMessage({
        message: '手机号格式错误',
        type: 'warning',
      })
      return
    }
    if(phone.value == user.phone){
      ElMessage({
        message: '手机号不能和之前相同',
        type: 'warning',
      })
      return
    }
  }
  count.value = true
  Code.value = user.gainCode()
  ElNotification({
    title: '验证码',
    message: '验证码为' + Code.value,
    type: 'success',
    duration: 10000
  })
  timer.value = setInterval(() =>{
    if(time.value == 0){
      clearInterval(timer.value);
      count.value = false
      time.value = 10
    }else {
      time.value--
    }
  },1000)
}

const certain = () => {
  if(active.value == 0){
    if(code.value == Code.value && Code.value != '') {
      ElMessage({
        message: '验证成功',
        type: 'success',
      })
      active.value = 1
      clearInterval(timer.value);
      count.value = false
      time.value = 10
      code.value = ''
      Code.value = ''
    }else {
      ElMessage({
        message: '验证码错误',
        type: 'error',
      })
    }
  }else {
    const phonePattern = /^1\d{10}$/;
    if(!phonePattern.test(phone.value)){
      ElMessage({
        message: '手机号格式错误',
        type: 'warning',
      })
      return
    }
    if(code.value == Code.value && Code.value != ''){
      request({
        url: '/user/phone',
        method: 'POST',
        params: {
          phone: localStorage.getItem("phone"),
          newPhone: phone.value
        }
      }).then((res) => {
        ElMessage({
          showClose: true,
          message: '修改成功',
          type: 'success',
        })
        localStorage.setItem('phone', phone.value)
        active.value = 0
        clearInterval(timer.value);
        count.value = false
        time.value = 10
        code.value = Code.value = ''
        user.fetch()
      }).catch((err) => {
        console.log(err)
        ElMessage({
          message: '该手机号已被注册，无法更改',
          type: 'error',
        })
      })
    }
  }
}
</script>

<template>
  <div class="info">
    <div style="color: #f9c022;font-size: 15px;padding-left: 5px;border-left: 3px solid #f9c022;">
      手机换绑：
    </div>
    <el-steps style="margin-top: 40px" :active="active" align-center finish-status="success" process-status="finish">
      <el-step title="步骤 1" description="身份验证" />
      <el-step title="步骤 2" description="绑定新手机" />
    </el-steps>
    <div class="phone" v-if="active == 0">
      <div class="phone_text">
        手机号：&nbsp;&nbsp;{{user.phone}}
      </div>
      <div style="margin-left: 25px">
        <span style="font-size: 12px;color: #f9c022;cursor: pointer" @click="sendCode" v-if="!count">获取验证码</span>
        <span style="font-size: 12px;color: #9ba3af" v-if="count">{{time}}s后重新获取</span>
      </div>
    </div>
    <div class="phone" v-if="active == 0" style="border: none;margin-top: 10px">
      <div class="phone_text" style="width: 68px;margin-top: 2px">
        验证码:
      </div>
      <el-input class="phone_input" style="width: 130px"
                placeholder="请输入验证码"
                v-model="code"
                clearable
      />
    </div>

    <div class="phone" v-if="active == 1">
      <div class="phone_text" style="width: 68px;margin-top: 2px">
        手机号:
      </div>
      <el-input class="phone_input" style="width: 130px"
                placeholder="请输入手机号"
                v-model="phone"
                clearable
      />
      <div style="margin-left: 15px;margin-top: 1px">
        <span style="font-size: 12px;color: #f9c022;cursor: pointer" @click="sendCode" v-if="!count">获取验证码</span>
        <span style="font-size: 12px;color: #9ba3af" @click="sendCode" v-if="count">{{time}}s后重新获取</span>
      </div>
    </div>
    <div class="phone" v-if="active == 1" style="margin-top: 8px">
      <div class="phone_text" style="width: 68px;margin-top: 2px">
        验证码:
      </div>
      <el-input class="phone_input" style="width: 130px"
                placeholder="请输入验证码"
                v-model="code"
                clearable
      />
    </div>
    <div class="phone_button_box">
      <div style="display: flex;justify-content:center;align-items:center;width: 100%">
        <div class="phone_button" @click="certain">确认</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info{
  box-sizing: border-box;
  width: 60%;
  padding: 40px 30px 30px 105px;
}

.phone{
  display: flex;
  margin: 30px 20px 0;
  padding-left: 115px;
  padding-bottom: 10px;
  letter-spacing: 0.8px;
}

.phone_text{
  width: 185px;
  font-size: 14px;
}

.phone_input{
  width: 100px;
  height: 25px;
  font-size: 12px;
}

.phone_button_box{
  margin-top: 20px;
  display: flex;
  justify-content:center;
  align-items:center;
}

.phone_button{
  display: flex;
  justify-content:center;
  align-items:center;
  width: 25%;
  height: 35px;
  border-radius: 8px;
  text-align: center;
  background: #f9c022;
  color: white;
  border: 1px solid #e3e5e7;
  cursor: pointer;
}
</style>