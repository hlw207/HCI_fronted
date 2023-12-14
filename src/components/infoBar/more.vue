<script setup lang="ts">
import {computed, onMounted, ref, watch} from "vue";
import {Check, CircleCheck, Collection, Location} from "@element-plus/icons-vue";
import {PICTURE_ADDR} from "~/config";
import {ElMessage} from "element-plus";

const props = defineProps<{
  show: boolean
  name: string
  price: number
  path: string
}>()

const emits = defineEmits(['close'])

const dialog = ref(false)
const address = ref('')
const today = ref("")
const tomorrow = ref("")
const canDo = ref([])
const choiceBox = ref([[false,false,false,false,false,false],[false,false,false,false,false,false]])
const agreement = ref(false)
const input = ref()

const warn = ref(false)
const warnTime = ref(false)
const timeOut = () =>{
  let date = new Date()
  let todayIndex = date.getDay()
  let tomorrowIndex = (todayIndex + 1) % 7;
  let nextIndex = (todayIndex + 2) % 7;
  let weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  if(date.getHours() < 17) {
    today.value = '今天' + '(' + weekDays[todayIndex] + ')'
    tomorrow.value = '明天' + '(' + weekDays[tomorrowIndex] + ')'
  }else {
    today.value = '明天' + '(' + weekDays[tomorrowIndex] + ')'
    tomorrow.value = '明天' + '(' + weekDays[nextIndex] + ')'
  }

  let i
  canDo.value = []
  for (i = 0; i < 6;i++){
    if(date.getHours() + 1 >= 8 + 2 * i && date.getHours() < 17){
      canDo.value.push(false)
    }else {
      canDo.value.push(true)
    }
  }
}

const isTimeChoice = computed(()=>{
  let i: number
  for (i = 0;i < 2;i++){
    let j: number
    for (j = 0;j < 6;j++){
      if(choiceBox.value[i][j])
        return true
    }
  }
  return false
})

const transformToDate = (index: number) =>{
  let start = 6 + index * 2
  let end = start + 2
  return start + ':00-' + end + ':00'
}

const choice = (i: number, j: number) =>{
  choiceBox.value[i][j] = !choiceBox.value[i][j]
}

const click = () =>{
  agreement.value = !agreement.value
}

const submit = () =>{
  if(address.value == ''){
    warn.value = true
    input.value.focus()
    return
  }
  warn.value = false
  if(!isTimeChoice.value && !agreement.value){
    warnTime.value = true
    return;
  }
  warnTime.value = false
  clear()
  ElMessage.success("预约成功，亲亲请保持电话畅通哦")
}

const clear = () => {
  dialog.value = false
  choiceBox.value = [[false,false,false,false,false,false],[false,false,false,false,false,false]]
  address.value = today.value = tomorrow.value = ''
  agreement.value = false
  canDo.value = []
}

const close = () => {
  clear()
  emits('close')
}

watch(dialog,()=>{
  if(dialog){
    timeOut()
  }
})

watch(()=>props.show,(val)=>{
  dialog.value = val
})

onMounted(()=>{
  timeOut()
})
</script>

<template>
  <el-dialog v-model="dialog" width="55%" align-center @close="close">
    <div class="more_container">
      <div class="more_top">
        <el-icon style="color: #f2711c;font-size: 16px;margin-right: 3px"><Collection /></el-icon>
        <span>补充看车信息，</span>
        <span style="color: #f2711c">车况合适立即帮您约车</span>
      </div>
      <div class="more_show">
        <div style="height: 100%"><el-image :src="props.path" style="height: 100%"></el-image></div>
        <div class="more_show_text">
          <div style="font-weight: bolder;font-size: 15px">{{props.name}}</div>
          <div style="font-size: 12px;display: flex;margin-top: 1px">
            <div style="border-right: 1px solid rgba(128,128,128,0.3);padding-right: 5px">卖家报价：{{props.price.toFixed(2)}}万</div>
            <div style="margin-left: 5px">首付：{{(props.price / 4).toFixed(2)}}万</div>
          </div>
          <div class="more_show_bottom">
            <div>当前车辆位置</div>
            <el-icon style="margin-left: 5px;color: #c5c5c5;font-size: 16px"><Location /></el-icon>
            <div style="margin-left: 5px;color: #969696;">(以实际看车地点为准)</div>
          </div>
        </div>
      </div>
      <div class="more_info">
        <div class="more_info_text">
          <div>我的常用地址</div>
        </div>
        <div class="input_main" style="margin-left: 25px">
          <input v-model="address" class="input_input" placeholder="请精确到街道或小区名" ref="input">
        </div>
        <div style="color: #969696;margin-left: 10px;font-size: 12px">
          (帮你规划看车路线)
        </div>
        <div style="color: #db2828;margin-left: 10px;font-size: 12px" v-if="warn">
          请填写常用地址
        </div>
      </div>
      <div class="more_info" style="margin-top: 20px">
        <div class="more_info_text">
          <div>请选择看车时间</div>
          <div style="color: #969696;margin-left: 10px">(多选更容易约到车)</div>
          <div style="color: #db2828;margin-left: 10px;font-size: 12px" v-if="warnTime">
            请填写常用地址
          </div>
        </div>
      </div>
      <div class="more_table">
        <div class="more_table_box" style="margin-left: 0"></div>
        <template v-for="index in 6">
          <div class="more_table_box">
            {{transformToDate(index)}}
          </div>
        </template>
        <div class="more_table_box" style="margin-left: 0">
          {{today}}
        </div>
        <template v-for="index in 6">
          <div class="more_table_box">
            <div class="more_cannot" v-if="!canDo[index - 1]">不可选</div>
            <div class="more_can" v-if="canDo[index - 1]" :class="{more_can_active: choiceBox[0][index - 1]}" @click="choice(0, index - 1)">
              <div v-if="!choiceBox[0][index - 1]">可选</div>
              <div v-if="choiceBox[0][index - 1]"><el-icon><CircleCheck /></el-icon></div>
            </div>
          </div>
        </template>
        <div class="more_table_box" style="margin-left: 0">
          {{tomorrow}}
        </div>
        <template v-for="index in 6">
          <div class="more_table_box">
            <div class="more_can" :class="{more_can_active: choiceBox[1][index - 1]}" @click="choice(1, index - 1)">
              <div v-if="!choiceBox[1][index - 1]">可选</div>
              <div v-if="choiceBox[1][index - 1]"><el-icon><CircleCheck /></el-icon></div></div>
          </div>
        </template>
        <div class="more_bottom">
          <div @click="click" class="check" :class="{check_active: agreement}">
            <el-icon><Check /></el-icon>
          </div>
          <div style="font-size: 11px">以上时间均不合适？让工作人员和我预约其他时间</div>
        </div>
      </div>
      <div class="more_bottom_button">
        <div class="more_button" @click="submit">提交</div>
      </div>
    </div>
  </el-dialog>
</template>

<style scoped>
.more_container{
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
}

.more_top{
  display: flex;
  align-items: center;
  font-size: 15px;
}

.more_show{
  display: flex;
  background: #f2f2f2;
  border-radius: 5px;
  padding: 20px 15px;
  margin-top: 10px;
  height: 100px;
}

.more_show_text{
  position: relative;
  flex: 1;
  padding-left: 10px;
}

.more_show_bottom{
  display: flex;
  align-items: center;
  position: absolute;
  left: 10px;
  bottom: 0;
  font-size: 13px;
}

.more_info{
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.more_info_text{
  display: flex;
}

.input_main{
  position: relative;
  display: flex;
  align-items: center;
  width: 45%;
  height: 36px;
  border: 1px solid #c1c2c2;
  cursor: pointer;
  border-radius: 2px;
}

.input_main:focus-within{
  border: 1px solid #f2711c;
}

.input_input{
  margin-left: 8px;
  border: none;
  box-shadow:none;
  outline: none;
  width: 80%;
  height: 30px;
}

.input_input::placeholder{
  font-size: 12px;
  color: #c0c1c2;
}

.more_table{
  margin-top: 10px;
  padding: 5px;
  background: #f9f9f9;
  display: flex;
  flex-wrap: wrap;
}

.more_table_box{
  box-sizing: border-box;
  width: 14.1%;
  margin-left: 0.2%;
  margin-bottom: 0.2%;
  height: 35px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
}

.more_cannot{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d4d4d4;
}

.more_can{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #39b662;
  background: white;
  cursor: pointer;
}

.more_can_active{
  background: #e7fbe6;
  color: #39b662;
  font-size: 16px;
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

.more_bottom{
  display: flex;
  align-items: center;
  padding: 10px 5px 5px 5px;
}

.more_bottom_button{
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.more_button{
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28%;
  height: 40px;
  background: #fc5421;
  color: white;
  font-size: 16px;
  letter-spacing: 3px;
  cursor: pointer;
}
</style>