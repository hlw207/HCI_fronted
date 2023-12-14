<script setup lang="ts">

import {ref, watch} from "vue";
import {Check, Iphone} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {useUserStore} from "~/stores/user";

const props = defineProps<{
  show: boolean,
  title: string
}>()

const emits = defineEmits(['cancel'])

const user = useUserStore()
const show = ref(false)
const agreement = ref(false)
const phone = ref(user.phone)
const formShow = ref(false)

watch(()=>user.phone,(val)=>{
  phone.value = val
})

watch(phone,()=>{
  phone.value = phone.value.replace(/[a-zA-Z\u4e00-\u9fa5]/g, '').replace(' ','')
})

watch(()=>props.show,(val)=>{
  show.value = val
})

const click = () =>{
  agreement.value = !agreement.value
}

const submit = () => {
  if(!agreement.value){
    ElMessage.warning("请勾选用户使用协议")
    return
  }
  const phonePattern = /^1\d{10}$/;
  if(!phonePattern.test(phone.value)){
    ElMessage({
      message: '手机号格式错误',
      type: 'warning',
    })
    return
  }
  emits('cancel')
  formShow.value = true
}
</script>

<template>
  <el-dialog v-model="show" width="36%" align-center @close="emits('cancel')">
      <div style="display: flex;justify-content: center">
        <div style="position: relative">
          <div class="pop_top">
            <el-icon style="font-size: 40px;color: #fc5421"><Iphone /></el-icon>
          </div>
        </div>
      </div>
    <div class="pop_container">
      <div class="pop_up">
        您咨询的车辆
      </div>
      <div class="pop_middle">
        <div class="pop_middle_main">{{props.title}}</div>
      </div>
      <div class="input_main">
        <input class="input_input" placeholder="请输入您的手机号" v-model="phone">
      </div>
      <div class="pop_button" :class="{pop_button_active: agreement}" @click="submit">
        提交
      </div>
      <div style="width: 100%;margin-top: 5px;display: flex;flex-direction: row;justify-content: center;align-items: center">
        <div @click="click" class="check" :class="{check_active: agreement}">
          <el-icon><Check /></el-icon>
        </div>
        <span style="color: #b2b2b2;font-size: 12px">
              我已阅读并同意
          <el-link type="warning" style="font-size: 12px;margin-top: -3px;color: #fc5421;border-color: #fc5421">《用户使用协议》</el-link>
          <el-link type="warning" style="font-size: 12px;margin-top: -3px;color: #fc5421;border-color: #fc5421">《隐私权条款》</el-link>
        </span>
      </div>
    </div>
  </el-dialog>
  <More :show="formShow" :name="props.title" :price="15" @close="formShow=false"></More>
</template>

<!--<style>-->
<!--.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate-->
<!--.el-checkbox__inner{-->
<!--  background-color:#fc5421;-->
<!--  border-color:#fc5421;-->
<!--}-->
<!--.el-checkbox__input.is-checked + .el-checkbox__label {-->
<!--  color: #fc5421;-->
<!--}-->
<!--.el-checkbox.is-bordered.is-checked{-->
<!--  border-color: #fc5421;-->
<!--}-->
<!--.el-checkbox__input.is-focus .el-checkbox__inner{-->
<!--  border-color:  #fc5421;-->
<!--}-->
<!--</style>-->


<style scoped>
.pop_top{
  position: absolute;
  top: -95px;
  left: -35px;
  border-radius: 50px;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
}

.pop_container{
  margin-top: -10px;
  position: relative;
  width: 100%;
}

.pop_up{
  display: flex;
  justify-content: center;
  font-size: 22px;
  color: black;
  margin-bottom: 15px;
}

.pop_middle{
  display: flex;
  justify-content: center;
  margin: 0 15%;
}

.pop_middle_main{
  color: black;
  border-left: 2px solid #fc5421;
  padding-left: 10px;
  padding-top: 1px;
  padding-bottom: 1px;
  font-size: 16px;
  max-width: 100%;
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出的文本 */
  text-overflow: ellipsis; /* 使用省略号表示溢出的文本 */
}

.input_main{
  position: relative;
  display: flex;
  align-items: center;
  margin: 20px 14% 0 14%;
  height: 40px;
  border: 1px solid #c1c2c2;
  cursor: pointer;
}

.input_main:focus-within{
  border: 1px solid #f2711c;
}

.input_input{
  margin-left: 8px;
  border: none;
  box-shadow:none;
  outline: none;
  width: 50%;
  height: 35px;
}

.pop_button{
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-left: 14%;
  margin-right: 14%;
  height: 20px;
  padding: 10px 0;
  font-size: 17px;
  letter-spacing: 3px;
  background: #f5f5f5;
  color: #c1c1c1;
  border: 1px solid #c1c1c1;
  cursor: not-allowed;
  transition: all 0.5s;
}

.pop_button_active{
  color: white;
  background: #fc5421;
  border: 1px solid #fc5421;
  cursor: pointer;
}

.check{
  width: 13px;
  height: 13px;
  border-radius: 2px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  margin-right: 10px;
}

.check:hover{
  border: 1px solid #fc5421;
}

.check_active{
  background: #f2711c;
}
</style>