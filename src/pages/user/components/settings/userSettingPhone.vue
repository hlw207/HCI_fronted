<script setup lang="ts">

import {ref} from "vue";
import {useUserStore} from "~/stores/user";

const user = useUserStore()
const active = ref(0)
const time = ref(10)
const timer = ref()
const count = ref(false)
const phone = ref()
const code = ref()
const sendCode = () =>{
  count.value = true
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
    active.value = 1
    clearInterval(timer.value);
    count.value = false
    time.value = 10
  }else {
    active.value = 0
    clearInterval(timer.value);
    count.value = false
    time.value = 10
  }
}
</script>

<template>
  <div class="info">
    <div style="color: #26aeea;font-size: 15px;padding-left: 5px;border-left: 3px solid #26aeea;">
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
        <span style="font-size: 12px;color: #26aeea;cursor: pointer" @click="sendCode" v-if="!count">获取验证码</span>
        <span style="font-size: 12px;color: #9ba3af" @click="sendCode" v-if="count">{{time}}s后重新获取</span>
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
        <span style="font-size: 12px;color: #26aeea;cursor: pointer" @click="sendCode" v-if="!count">获取验证码</span>
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
  background: #26aeea;
  color: white;
  border: 1px solid #e3e5e7;
  cursor: pointer;
}
</style>