<script setup lang="ts">
import {useCarDetailData} from "~/stores/carDetailData";
import {onMounted, reactive, ref, watch} from "vue";
import {ArrowLeftBold, ArrowRightBold, Close, CopyDocument, PhoneFilled} from "@element-plus/icons-vue";
import {useRoute} from "vue-router";
import {request} from "~/utils/request";

const route = useRoute()
const car = reactive({
  name: '',
  price: 0,
  carDistance: 0,
  carAge: '',
  carPosition: '',
  carGear: '',
  carRecord: '0次',
  carTime: '',
  carPollution: '',
  picture: ''
})
const popShow = ref(false)
const popPrice = ref(false)

const detail = useCarDetailData()
const show = ref()
const price = ref("")

const top = ref()
const left = ref()
const bottom = ref()
const right = ref()

const canClick = ref(true)
const margin_left = ref(-780)
const time = ref(0.5)

watch(price, ()=>{
  price.value = price.value.replace(/[a-zA-Z\u4e00-\u9fa5]/g, '').replace(' ','')
})

const mouseHandle = (event: MouseEvent) =>{
  const x = event.clientX
  const y = event.clientY
  if(!(x >= left.value && x <= right.value && y >= top.value && y <= bottom.value)){
    detail.index = -1
    window.removeEventListener('click', mouseHandle)
  }
}

const arrowRight = () =>{
  if(canClick.value) {
    canClick.value = false
    margin_left.value = -780 * 2
    setTimeout(() => {
      detail.index = detail.index + 1 >= detail.total ? 0 : detail.index + 1
      margin_left.value = -780
      time.value = 0
      setTimeout(() => {
        time.value = 0.5
        canClick.value = true
      }, 10)
    }, 300)
  }
}

const arrowLeft = () =>{
  if(canClick.value) {
    canClick.value = false
    margin_left.value = 0
    setTimeout(() => {
      detail.index = detail.index - 1 < 0 ? detail.total - 1: detail.index - 1
      margin_left.value = -780
      time.value = 0
      setTimeout(() => {
        time.value = 0.5
        canClick.value = true
      }, 10)
    }, 300)
  }
}

watch(()=>route.params.id,()=>{
  request({
    url: `/cars/${route.params.id}`,
    method: 'GET',
  }).then((res)=>{
    car.name = res.data.name
    car.carPosition = res.data.carPosition
    car.carAge = res.data.carAge
    car.carGear = res.data.carGear
    car.carDistance = res.data.carDistance
    car.price = res.data.price
    car.carTime = res.data.carTime
    car.carPollution = res.data.carPollution + 'L'
    car.picture = res.data.picture
  })
})

onMounted(()=>{
  request({
    url: `/cars/${route.params.id}`,
    method: 'GET',
  }).then((res)=>{
    car.name = res.data.name
    car.carPosition = res.data.carPosition
    car.carAge = res.data.carAge
    car.carGear = res.data.carGear
    car.carDistance = res.data.carDistance
    car.price = res.data.price
    car.carTime = res.data.carTime
    car.carPollution = res.data.carPollution + 'L'
    car.picture = res.data.picture
  })
  setTimeout(()=>{
    top.value = Math.floor(show.value.getBoundingClientRect().top)
    left.value = Math.floor(show.value.getBoundingClientRect().left)
    bottom.value = Math.floor(show.value.getBoundingClientRect().bottom)
    right.value = Math.floor(show.value.getBoundingClientRect().right)
    window.addEventListener('click', mouseHandle)
  },1)
})
</script>

<template>
  <div v-if="detail.index != -1">
    <div class="mask">
    </div>
    <div class="down">
      <div class="show" ref="show">
        <div class="show_left">
          <div class="show_left_main">
            <template v-for="index in 3">
              <img class="show_picture" :src="detail.getPicture((detail.index + index - 2 + detail.total) % detail.total)" alt="" onselectstart ='return false'/>
            </template>
          </div>
          <div class="show_left_down">
            <el-icon style="font-size: 14px"><CopyDocument /></el-icon>
            <div style="margin: 0 6px;font-size: 14px">{{detail.index + 1}}/{{detail.total}}</div>
          </div>
          <div class="show_arrow" style="left: 0">
            <el-icon class="arrow" @click="arrowLeft"><ArrowLeftBold /></el-icon>
          </div>
          <div class="show_arrow" style="right: 0">
            <el-icon class="arrow" @click="arrowRight"><ArrowRightBold /></el-icon>
          </div>
        </div>
        <div class="show_right">
          <div class="show_top">
            {{car.name}} {{car.carAge.substring(0,4)}}款
          </div>
          <div class="show_info">
            <div>
              {{car.carAge.substring(0, 4)}}年{{car.carAge.substring(5, 7)}}月
            </div>
            <div style="height: 18px;width: 0.5px;background: #9a9a9a;margin: 2px 8px 0 8px"></div>
            <div>
              {{car.carDistance}}万公里
            </div>
          </div>
          <div class="car_cards">
            <div class="car_card">自营</div>
            <div class="car_card">准新车</div>
          </div>
          <div class="show_price">
            <div style="color: #fa5325;font-size: 30px;font-weight: bold">
              ￥{{car.price.toFixed(2)}}
            </div>
            <div style="color: #fa5325;font-weight: bold;margin-top: 13px;margin-left: 3px">
              万
            </div>
            <div style="color: #9a9a9a;font-size: 12px;margin-top: 18px;margin-left: 8px">
              新车价：{{(car.price * 5).toFixed(2)}}万
            </div>
          </div>
          <div class="show_button" @click="popShow=true;detail.index = -1">
            <el-icon class="show_icon"><PhoneFilled /></el-icon>
            <div style="margin-left: 10px">
              咨询车况
            </div>
          </div>
          <div class="show_cut">
            <div class="show_cut_left">
              <input class="show_input" placeholder="输入您的意向价" v-model="price">
              <div class="show_cut_left_text">万</div>
            </div>
            <div class="show_cut_right" @click="popPrice=true;detail.index=-1">砍价</div>
          </div>
        </div>
        <div class="show_delete" @click="detail.index = -1">
          <el-icon><Close /></el-icon>
        </div>
      </div>
    </div>
  </div>
  <PopUp :title="car.name + ' ' + car.carAge.substring(0, 4) + '款'" :show="popShow" :price="car.price" :path="car.picture" @cancel="popShow=false"/>
  <PopPrice :title="car.name + ' ' + car.carAge.substring(0, 4) + '款'" :input_price="price" :show="popPrice" :price="car.price" :path="car.picture" @cancel="popPrice=false"/>
</template>

<style scoped>
.mask {
  z-index: 998;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.down{
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.show{
  position: relative;
  display: flex;
  width: 1050px;
  height: 500px;
  background: white;
  opacity: 1;
}

.show_delete{
  position: absolute;
  right: 10px;
  top: 10px;
  color: #8c8c8c;
  cursor: pointer;
  font-size: 20px;
}

.show_delete:hover{
  color: black;
}

.show_left{
  display: flex;
  position: relative;
  width: 780px;
  overflow: hidden;
}

.show_left_main{
  margin-left: v-bind(margin_left + 'px');
  display: flex;
  transition: all v-bind(time + 's');
}

.show_picture{
  flex-shrink:0;
  width: 780px;
  height: 500px;
}

.show_left_down{
  position: absolute;
  bottom: 0;
  left: 0;
  height: 32px;
  width: 100%;
  display: flex;
  justify-content: right;
  color: white;
  align-items: center;
}

.show_arrow{
  position: absolute;
  top: 0;
  width: 80px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow{
  font-size: 40px;
  cursor: pointer;
  color: white;
}

.arrow:hover{
  color: #fc0e11;
}

.show_right{
  width: 270px;
}

.show_top{
  padding-left: 15px;
  margin-top: 35px;
  font-size: 22px;
  font-weight: bold;
  color: black;
  word-wrap: break-word;
}

.show_info{
  margin-top: 10px;
  padding-left: 15px;
  display: flex;
  align-items: center;
  color: #9a9a9a;
  font-weight: bold;
}

.car_cards{
  display: flex;
  height: 17px;
  overflow: hidden;
  margin: 13px 0 13px 10px;
  color: #fff;
}

.car_card{
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  margin-left: 4px;
  padding: 0 5px;
  height: 17px;
  max-width: 80px;
  background-color: #9298B0;
  font-size: 11px;
}

.show_price{
  margin-top: 20px;
  padding-left: 15px;
  display: flex;
}

.show_button{
  display: flex;
  margin-top: 30px;
  margin-left: 15px;
  margin-right: 20px;
  height: 40px;
  background: #fa5325;
  color: white;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

@keyframes rotating{
  5%   {transform: rotate(-10deg)}
  15%   {transform: rotate(10deg)}
  25%   {transform: rotate(-10deg)}
  35%   {transform: rotate(10deg)}
  45%   {transform: rotate(-10deg)}
  50%  {transform: rotate(10deg)}
  55%  {transform: rotate(0deg)}
  100% {transform: rotate(0deg)}
}

.show_icon{
  animation: rotating 2s;
  animation-delay: 0.5s;
  animation-iteration-count: infinite;
  font-size: 20px;
}

.show_cut{
  box-sizing: border-box;
  display: flex;
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 20px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: white;
  cursor: pointer;
}

.show_cut_left{
  position: relative;
  width: 58%;
  display: flex;
  align-items: center;
}

.show_cut_left_text{
  position: absolute;
  right: 10px;
  color: #717171;
  font-size: 13px;
}

.show_input{
  margin-top: 2px;
  margin-left: 5px;
  border: none;
  box-shadow:none;
  outline: none;
  font-size: 15px;
  width: 100px;
  color: #6c6c6c;
}

.show_input::placeholder{
  font-size: 13px;
  color: #dddddd;
}

.show_cut_right{
  width: 42%;
  background: #fcb31f;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.show_cut:hover{
  border: 1px solid #fcb31f;
}
</style>