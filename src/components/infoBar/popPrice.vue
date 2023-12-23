<script setup lang="ts">

import {ref, watch} from "vue";
import {Check, Iphone} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {useUserStore} from "~/stores/user";

const props = defineProps<{
  show: boolean,
  title: string
  price: number
  path: string
}>()

const emits = defineEmits(['cancel'])

const user = useUserStore()
const show = ref(false)
const agreement = ref(false)
const price = ref('')
const phone = ref(user.phone)

watch(()=>user.phone,(val)=>{
  phone.value = val
})

watch(price, ()=>{
  price.value = price.value.replace(/[a-zA-Z\u4e00-\u9fa5]/g, '').replace(' ','')
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
  if(price.value == ''){
    ElMessage.warning("请输入您的期望价格")
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
  ElMessage.success("申报成功，请您保持手机畅通哦")
}
</script>

<template>
  <el-dialog v-model="show" width="36%" align-center @close="emits('cancel')">
    <div style="display: flex;justify-content: center">
      <div style="position: relative">
        <div class="pop_top">
          <el-icon style="font-size: 40px;color: #fc5421"><GoodsFilled /></el-icon>
        </div>
      </div>
    </div>
    <div class="pop_container">
      <div class="pop_up">
        请输入您期望的价格
      </div>
      <div class="pop_middle">
        <div class="pop_middle_main">
          <span style="color: #999">卖家报价：</span>
          <span style="color: #e5601f">{{props.price}}万元</span>
        </div>
      </div>
      <div class="input_main">
        <input class="input_input" placeholder="期望价格" v-model="price">
        <div class="input_right">万</div>
      </div>
      <div class="input_main">
        <input class="input_input" placeholder="请输入您的手机号" v-model="phone">
        <div class="input_right"><el-icon style="font-size: 15px"><Iphone /></el-icon></div>
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
</template>


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
  margin-bottom: 5px;
}

.pop_middle{
  display: flex;
  justify-content: center;
  margin: 0 15%;
}

.pop_middle_main{
  color: black;
  padding-left: 10px;
  padding-top: 1px;
  padding-bottom: 1px;
  font-size: 11px;
  max-width: 100%;
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出的文本 */
  text-overflow: ellipsis; /* 使用省略号表示溢出的文本 */
}

.input_main{
  position: relative;
  display: flex;
  align-items: center;
  margin: 10px 14% 0 14%;
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

.input_right{
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: right;
  margin-right: 15px;
  font-size: 13px;
  color: #999;
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