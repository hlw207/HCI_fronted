<script setup lang="ts">

import {Ref, ref} from "vue";
import {ElMessage} from "element-plus";
import {useUserStore} from "~/stores/user";
import {request} from "~/utils/request";

const user = useUserStore()
const old_password = ref()
const password = ref()
const password_certain = ref()
const active = ref(0)
const certain = () => {
  if(active.value == 0){
    request({
      url: '/user/password',
      method: 'GET',
      params: {
        phone: localStorage.getItem("phone"),
        password: old_password.value
      }
    }).then((res) => {
      ElMessage({
        showClose: true,
        message: '验证成功',
        type: 'success',
      })
      active.value = 1
    }).catch((err) => {
      console.log(err)
      ElMessage({
        message: '密码错误',
        type: 'error',
      })
    })
    old_password.value = ''
  }else if(active.value == 1){
    if(password.value.length < 6){
      ElMessage({
        showClose: true,
        message: '密码过短',
        type: 'warning',
      })
      password.value = ''
    }else {
      active.value = 2
    }
  }else if(active.value == 2){
    if(password_certain.value != password.value){
      ElMessage({
        showClose: true,
        message: '两次输入密码不同，请重试',
        type: 'error',
      })
      password_certain.value = ''
    }else {
      request({
        url: '/user/password',
        method: 'POST',
        params: {
          phone: localStorage.getItem("phone"),
          password: password_certain.value
        }
      }).then((res) => {
        ElMessage({
          showClose: true,
          message: '修改密码成功',
          type: 'success',
        })
        active.value = 1
      }).catch((err) => {
        console.log(err)
        ElMessage({
          message: '修改失败，请重试',
          type: 'error',
        })
      })
      setTimeout(()=> {
        old_password.value = password.value = password_certain.value = ''
        active.value = 0
      }, 1000)
    }
  }
}

const ret = () =>{
  password.value = password_certain.value = ''
  active.value = 1
}


const rule = (type : number) => {
  let p : string
  switch (type){
    case 1:
      p = old_password.value
      break
    case 2:
      p = password.value
      break
    case 3:
      p = password_certain.value
      break
  }
  if(p.length > 18){
    ElMessage({
      showClose: true,
      message: '密码超出最大长度',
      type: 'warning',
    })
    p = p.substring(0,18)
  }
  switch (type){
    case 1:
      old_password.value = p
      break
    case 2:
      password.value = p
      break
    case 3:
      password_certain.value = p
      break
  }
}
</script>

<template>
  <div class="info">
    <div style="color: #f2711c;font-size: 15px;padding-left: 5px;border-left: 3px solid #f2711c;">
      密码修改：
    </div>
    <el-steps style="margin-top: 40px" :active="active" align-center finish-status="success" process-status="finish">
      <el-step title="步骤 1" description="验证旧密码" />
      <el-step title="步骤 2" description="输入新密码" />
      <el-step title="步骤 3" description="确认新密码"/>
    </el-steps>
    <div class="password" v-if="active == 0">
      <div class="password_text">
        旧密码：
      </div>
      <el-input class="password_input"
          v-model="old_password"
          type="password"
          placeholder="请输入旧密码"
          @input="rule(1)"
          show-password
      />
    </div>
    <div class="password_tip" v-if="active == 0">
      密码长度不能超过18位
    </div>
    <div class="password" v-if="active == 1">
      <div class="password_text">
        新密码：
      </div>
      <el-input class="password_input"
                v-model="password"
                type="password"
                placeholder="请输入新密码"
                @input="rule(2)"
                show-password
      />
    </div>
    <div class="password_tip" v-if="active == 1">
      密码长度不能超过18位
    </div>
    <div class="password" v-if="active == 2">
      <div class="password_text">
        确认密码：
      </div>
      <el-input class="password_input"
                v-model="password_certain"
                type="password"
                placeholder="请确认密码"
                @input="rule(3)"
                show-password
      />
    </div>
    <div class="password_tip" v-if="active == 2">
      密码长度不能超过18位
    </div>
    <div class="password_button_box">
      <div style="display: flex;justify-content:center;align-items:center;width: 100%">
          <div class="password_button_return" v-if="active==2" @click="ret">返回</div>
          <div class="password_button" @click="certain">确认</div>
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

.password{
  display: flex;
  margin-top: 40px;
  margin-left: 105px;
}

.password_text{
  width: 75px;
  margin-top: 4px;
  font-size: 14px;
}

.password_input{
  width: 220px;
  font-size: 12px;
}

.password_tip{
  margin-top: 8px;
  margin-left: 184px;
  font-size: 11px;
  color: #9ba3af;
}

.password_button_box{
  margin-top: 20px;
  display: flex;
  justify-content:center;
  align-items:center;
}

.password_button{
  display: flex;
  justify-content:center;
  align-items:center;
  width: 25%;
  height: 35px;
  border-radius: 8px;
  text-align: center;
  background: #f2711c;
  color: white;
  border: 1px solid #e3e5e7;
  cursor: pointer;
}

.password_button_return{
  display: flex;
  justify-content:center;
  align-items:center;
  width: 25%;
  height: 35px;
  margin-right: 30px;
  border-radius: 8px;
  text-align: center;
  background: white;
  color: black;
  border: 1px solid #e3e5e7;
  cursor: pointer;
}
</style>