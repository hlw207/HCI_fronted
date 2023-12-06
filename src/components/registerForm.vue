<script setup lang="ts">
import {ref, watch} from "vue";
import {request} from "~/utils/request";
import {ElMessage} from "element-plus";
import {useUserStore} from "~/stores/user";

const props = defineProps({
  dialogVisible: Boolean
})

const emits = defineEmits(['cancel'])

const user = useUserStore()

const username = ref('')
const password = ref('')
const password_certain = ref('')

const usernameWrong = ref(false)
const passwordWrong = ref(false)
const passwordCertainWrong = ref(false)

watch(username, ()=>{
  if(username.value.length != 0){
    request({
      url: '/user/use',
      method: 'GET',
      params: {
        username: username.value
      }
    }).then((res) => {
      usernameWrong.value = res.data
    }).catch((err) => {
      console.log(err)
      ElMessage.error('网络错误')
    })
  }else {
    usernameWrong.value = false
  }
  username.value = username.value.replace(/[\u4E00-\u9FA5]/g, '');
})

watch(password,()=>{
  passwordWrong.value = password.value.length < 6;
})

watch(password_certain,()=>{
  if(password.value.length != 0 && password_certain.value.length != 0){
    passwordCertainWrong.value = password.value != password_certain.value
    return
  }
  passwordCertainWrong.value = false
})

const cancel = () =>{
  username.value = password.value = password_certain.value = ''
  usernameWrong.value = passwordWrong.value = passwordCertainWrong.value = false
  emits('cancel')
}

const certain = () =>{
  if(!usernameWrong.value && !passwordWrong.value && !passwordCertainWrong.value){
    if(password.value == ''){
      passwordWrong.value = true
      return
    }
    if(password_certain.value == ''){
      passwordCertainWrong.value = true
      return;
    }
    request({
      url: '/register',
      method: 'POST',
      params: {
        phone: localStorage.getItem('phone'),
        username: username.value != '' ? username.value : user.username,
        password: password.value
      }
    }).then((res) => {
      user.fetch()
      ElMessage.success('注册成功')
      cancel()
    }).catch((err) => {
      console.log(err)
      ElMessage.error('网络错误')
    })
  }
}
</script>

<template>
  <el-dialog
      v-model="props.dialogVisible"
      width="35%"
      align-center
      :show-close="false"
      :before-close="cancel"
  >
    <template #header="{ close, titleId, titleClass }">
      <div style="color: #f9c022;font-size: 15px;padding-left: 5px;border-left: 3px solid #f9c022;">
        请输入<span v-if="user.username == ''">用户名和</span>密码：
      </div>
    </template>
    <div class="register">
      <div>
        <div class="register_box" v-if="user.username == ''">
          <div class="register_text">用户名：</div>
          <div class="input_input">
            <input v-model="username" class="register_input" placeholder="请输入用户名"/>
          </div>
          <span v-if="usernameWrong" style="color: #f26d6d;font-size: 11px;margin-left: 5px">名字被占用</span>
        </div>
        <div class="register_box">
          <div class="register_text">密码：</div>
          <div class="input_input">
            <input v-model="password" class="register_input" placeholder="请输入密码" type="password"/>
          </div>
          <span v-if="passwordWrong" style="color: #f26d6d;font-size: 11px;margin-left: 5px">密码要大于6位</span>
        </div>
        <div class="register_box">
          <div class="register_text">确认密码：</div>
          <div class="input_input">
            <input v-model="password_certain" class="register_input" placeholder="请输入密码" type="password"/>
          </div>
          <span v-if="passwordCertainWrong" style="color: #f26d6d;font-size: 11px;margin-left: 5px">两次密码不一致</span>
        </div>
        <div class="register_buttons">
          <div class="register_button cancel_button" @click="cancel">下次添加</div>
          <div class="register_button certain_button" @click="certain">确定</div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>
.register{
  display: flex;
  width: 100%;
  margin-left: 80px;
  align-items: center;
}

.register_box{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.register_text{
  width: 70px;
  display: flex;
  justify-content: right;
  font-size: 14px;
}

.input_input{
  display: flex;
  width: 150px;
  justify-content: center;
  align-items: center;
  height: 28px;
  border: 1px solid rgba(128, 128, 128, 0.4);
  border-radius: 5px;
}

.register_input{
  width: 130px;
  height: 25px;
  border: none;
  box-shadow:none;
  outline: none;
}

.register_input::placeholder{
  color: #9ba3af;
  font-size: 11px;
}

.input_input:focus-within{
  border: 1px solid #26aeea;
}

.register_buttons{
  margin-top: 15px;
  display: flex;
  align-items: center;
}

.register_button{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6px 28px;
  padding: 6px 15px;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
}

.certain_button{
  box-sizing: border-box;
  background: #f2711c;
  color: white;
}

.certain_button:hover{
  background: rgba(242, 113, 28, 0.7);
}

.cancel_button{
  box-sizing: border-box;
  background: white;
  border: 1px solid rgba(128, 128, 128, 0.2);
  color: black;
}

.cancel_button:hover{
  color: rgba(242, 113, 28, 0.7);
  border: 1px solid rgba(242, 113, 28, 0.7);
}
</style>