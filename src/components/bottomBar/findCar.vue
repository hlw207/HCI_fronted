<script setup lang="ts">
import {ArrowDown, Opportunity, ShoppingCart} from "@element-plus/icons-vue";
import {reactive, ref, watch} from "vue";
import {useUserStore} from "~/stores/user";
import {ElMessage} from "element-plus";

const user = useUserStore()
const click = ref([false,false,false,false,false,false])
const click_index = ref(-1)
const dialogShow = ref(false)

const choice = reactive({
  car: '',
  carAge: '',
  carTime: '',
  money: '',
  describe: '',
  phone: user.phone
})

const carAge = ref(["不限车龄","1年以内","2年以内","3年以内","4年以内","5年以内","6年以内","7年以内","8年以内","9年以内","不限"])
const carTime = ref(["1-2周内","1个月内","2个月内","半年内","先看看不着急"])

watch(()=>user.id,()=>{
  choice.phone = user.phone
})

watch(()=>choice.money,(val)=>{
  choice.money = val.replace(/[a-zA-Z\u4e00-\u9fa5]/g, '').replace(' ','')
})

watch(()=>choice.phone,(val)=>{
  choice.phone = val.replace(/[a-zA-Z\u4e00-\u9fa5]/g, '').replace(' ','')
})

const click_box = (index: number) =>{
  if(!click.value[index]) {
    click_index.value = index
    click.value[index] = true
    if (index == 1) {
      setTimeout(() => {
        window.addEventListener("click", handleClickAge)
      }, 1)
    }
    if (index == 2) {
      setTimeout(() => {
        window.addEventListener("click", handleClickTime)
      }, 1)
    }
  }
}

const handleClickAge = () =>{
  click.value[1] = false
  window.removeEventListener("click", handleClickAge)
}

const handleClickTime = () =>{
  click.value[2] = false
  window.removeEventListener("click", handleClickTime)
}

const clear = () =>{
  choice.car = choice.carAge = choice.carTime = choice.describe = choice.money = choice.phone = ''
}

const submitCar = (val : string) =>{
  choice.car = val
  setTimeout(()=>{
    click.value[0] = false
  },10)
}

const certain = () => {
  if(choice.car == ''||choice.carAge==''||choice.carTime==''||choice.money==''||choice.phone==''){
    ElMessage.warning("请填充完整信息")
    return;
  }
  const phonePattern = /^1\d{10}$/;
  if(!phonePattern.test(choice.phone)){
    ElMessage({
      message: '手机号格式错误',
      type: 'warning',
    })
    return
  }
  dialogShow.value = true
}
</script>

<template>
  <div class="find_container">
    <div class="find_left">
      <el-image src="../../../public/pictures/findCar.png"></el-image>
    </div>
    <div class="find_right">
      <div class="find_right_main">
        <div style="display: flex;align-items: center;justify-content: center">
          <div style="display: flex;justify-content: center;align-items: center">
            <el-icon style="color: #f2711c;font-size: 20px"><ShoppingCart /></el-icon>
            <div style="margin-left: 3px;font-size: 14px">
              求购好车
            </div>
          </div>
          <div class="clear" @click="clear">一键清空</div>
          <div style="flex: 1;display: flex;justify-content: right;color: #75756f;font-size: 12px;margin-top: 3px">
            咨询电话：400-072-6071
          </div>
        </div>
        <div style="display: flex;margin-top: 10px">
          <div class="select_main" style="margin-right: 2%" @click="click_box(0)" :class="{select_main_right_click: click[0]}">
            <div class="select_main_left">
              <div v-if="choice.car == ''" style="color: #c0c1c2">请选择预购车辆</div>
              <div v-if="choice.car != ''">{{choice.car}}</div>
              <CascaderChoose :top="30" :left="-10" :is-show="click[0]" @disShow="click[0] = false" @submit="submitCar"/>
            </div>
            <div class="select_main_right">
              <el-icon class="icon" :class="{icon_click: click[0]}"><ArrowDown /></el-icon>
            </div>
          </div>
          <div class="select_main" style="margin-left: 2%" @click="click_box(1)" :class="{select_main_right_click: click[1]}">
            <div class="select_main_left">
              <div v-if="choice.carAge == ''" style="color: #c0c1c2">车龄要求</div>
              <div v-if="choice.carAge != ''">{{choice.carAge}}</div>
            </div>
            <div class="select_main_right">
              <el-icon class="icon" :class="{icon_click: click[1]}"><ArrowDown /></el-icon>
            </div>
            <div class="choice_main" v-if="click[1]">
              <template v-for="age in carAge">
                <div class="choice_main_box" @click="choice.carAge=age">{{age}}</div>
              </template>
            </div>
          </div>
        </div>

        <div style="display: flex;margin-top: 10px">
          <div class="select_main" style="margin-right: 2%" @click="click_box(2)" :class="{select_main_right_click: click[2]}">
            <div class="select_main_left">
              <div v-if="choice.carTime == ''" style="color: #c0c1c2">您计划的提车时间是？</div>
              <div v-if="choice.carTime != ''">{{choice.carTime}}</div>
            </div>
            <div class="select_main_right">
              <el-icon class="icon" :class="{icon_click: click[2]}"><ArrowDown /></el-icon>
            </div>
            <div class="choice_main" v-if="click[2]">
              <template v-for="time in carTime">
                <div class="choice_main_box" @click="choice.carTime=time">{{time}}</div>
              </template>
            </div>
          </div>
          <div class="input_main" style="margin-left: 2%">
            <input v-model="choice.money" class="input_input" placeholder="输入预算">
            <div class="select_main_right">
              <div style="font-size: 12px;color: black">万元内</div>
            </div>
          </div>
        </div>

        <div class="describe_box">
          <textarea v-model="choice.describe" class="text_input" placeholder="老板描述一下心中爱车？如：3万公里以内，颜色红色，真皮内饰..."></textarea>
        </div>

        <div style="display: flex;margin-top: 10px">
          <div class="input_main" style="width: 50%">
            <input v-model="choice.phone" class="input_input" placeholder="11位手机号">
          </div>
          <div class="certain_button" @click="certain">
            <el-icon style="font-size: 16px;margin-right: 8px"><Opportunity /></el-icon>
            有合适车辆通知我
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogShow" width="30%" align-center>
    <div>
      <el-image src="../../../public/pictures/submit.png"></el-image>
    </div>
  </el-dialog>
</template>

<style scoped>
.find_container{
  margin-right: 32px;
  background: #ebebeb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.find_left{
  box-sizing: border-box;
  margin-left: 10%;
  width: 40%;
}


.find_right{
  box-sizing: border-box;
  width: 50%;
  display: flex;
  align-items: center;
}

.find_right_main{
  box-sizing: border-box;
  margin-left: 50px;
  background: #f8f8f9;
  width: 440px;
  height: 270px;
  padding: 25px;
  font-size: 13px;
}

.clear{
  margin-left: 10.5%;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.5);
  padding: 4px 8px;
}

.clear:hover{
  background: rgba(155, 163, 175, 0.1);
}

.select_main{
  position: relative;
  display: flex;
  align-items: center;
  width: 48%;
  height: 32px;
  border: 1px solid #c1c2c2;
  cursor: pointer;
}

.select_main_left{
  font-size: 12px;
  position: relative;
  margin-left: 10px;
}

.select_main_right{
  height: 100%;
  display: flex;
  justify-content: right;
  align-items: center;
  flex: 1;
  padding-right: 10px;
  color: #c1c2c2;
}

.icon{
  transition: all 0.3s;
}

.select_main_right_click{
  border: 1px solid #f2711c;
}

.icon_click{
  transform: rotate(180deg);
}

.choice_main{
  z-index: 100;
  position: absolute;
  top: 36px;
  width: 100%;
  max-height: 200px;
  padding: 5px 0;
  overflow-y: auto;
  background: white;
}

.choice_main_box{
  display: flex;
  font-size: 12px;
  color: black;
  padding: 8px 0 8px 10px;
}

.choice_main_box:hover{
  background: #fff7f0;
}

.input_main{
  position: relative;
  display: flex;
  align-items: center;
  width: 48%;
  height: 32px;
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
  background: #f8f8f9;
  width: 100px;
  height: 28px;
}

.input_input::placeholder{
  font-size: 12px;
  color: #c0c1c2;
}

.describe_box{
  margin-top: 10px;
  height: 60px;
  border: 1px solid #c1c2c2;
}

.describe_box:focus-within{
  border: 1px solid #f2711c;
}

.text_input{
  margin-top: 5px;
  border: none;
  box-shadow:none;
  outline: none;
  margin-left: 8px;
  width: 96%;
  height: 50px;
  background: #f8f8f9;
  color: black;
  font-size: 12px;
  font-family: Arial, sans-serif; /* 将字体设置为 Arial 或其他无衬线字体 */
}

.text_input::placeholder{
  font-size: 12px;
  color: #c0c1c2;
}

.certain_button{
  cursor: pointer;
  width: 50%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #fa5325;
  color: white;
  background: #fa5325;
}
</style>