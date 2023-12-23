<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {PICTURE_ADDR} from "~/config";
import {ArrowLeftBold, ArrowRightBold, CopyDocument, StarFilled} from "@element-plus/icons-vue";
import {request} from "~/utils/request";
import {useUserStore} from "~/stores/user";
import {ElMessage} from "element-plus";
import {useRoute} from "vue-router";
import {useCarDetailData} from "~/stores/carDetailData";

const pictures = ref([
  PICTURE_ADDR + '/car1.jpg',
  PICTURE_ADDR + '/car2.jpg',
  PICTURE_ADDR + '/car3.jpg',
  PICTURE_ADDR + '/car4.jpg',
  PICTURE_ADDR + '/car5.jpg',
  PICTURE_ADDR + '/car6.jpg',
  PICTURE_ADDR + '/car1.jpg',
  PICTURE_ADDR + '/car2.jpg',
  PICTURE_ADDR + '/car3.jpg',
  PICTURE_ADDR + '/car4.jpg',
  PICTURE_ADDR + '/car5.jpg',
  PICTURE_ADDR + '/car6.jpg',
])

const carId = ref()
const user = useUserStore()
const route = useRoute()
const ind = ref(0)
const show = ref(false)
const margin_left = ref(-1500)
const bottom_margin = ref(0)
const time = ref(0.3)
const canClick = ref(true)
const shine = ref(false)

const carDetail = useCarDetailData()

const arrowRight = () =>{
  if(canClick.value) {
    canClick.value = false
    margin_left.value = -2000
    choose(ind.value + 1 >= pictures.value.length ? 0 : ind.value + 1)
    setTimeout(() => {
      ind.value = ind.value + 1 >= pictures.value.length ? 0 : ind.value + 1
      margin_left.value = -1500
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
    margin_left.value = -1000
    choose(ind.value - 1 < 0 ? pictures.value.length - 1 : ind.value - 1)
    setTimeout(() => {
      ind.value = ind.value - 1 < 0 ? pictures.value.length - 1 : ind.value - 1
      margin_left.value = -1500
      time.value = 0
      setTimeout(() => {
        time.value = 0.5
        canClick.value = true
      }, 10)
    }, 300)
  }
}

const arrow = (index: number) =>{
  if(canClick.value){
    canClick.value = false
    let i = index - ind.value
    margin_left.value = -1500 - 500 * i
    choose(index)
    setTimeout(() => {
      ind.value = index
      margin_left.value = -1500
      time.value = 0
      setTimeout(() => {
        time.value = 0.5
        canClick.value = true
      }, 10)
    }, 300)
  }
}

const choose = (index: number) =>{
  bottom_margin.value = -100 * ((index - 2) > 0 ? index != pictures.value.length - 1 ? index - 2 : index - 3: 0)
}

const clickStar = () => {
  request({
    url: '/cars/collection',
    method: 'POST',
    params: {
      userId: useUserStore().id,
      carId: carId.value
    }
  }).then((res)=>{
  })
  ElMessage.success("成功关注")
  shine.value = true
}

const cancelStar = () => {
  request({
    url: '/cars/collection',
    method: 'DELETE',
    params: {
      userId: useUserStore().id,
      carId: carId.value
    }
  }).then((res)=>{
  })
  ElMessage.success("取消关注")
  shine.value = false
}

watch(()=>user.id,()=>{
  request({
    url: '/cars/collection',
    method: 'GET',
    params: {
      userId: user.id,
      carId: carId.value
    }
  }).then((res)=>{
    shine.value = res.data
  })
})

watch(()=>carDetail.id,()=>{
  pictures.value = [...carDetail.surface, ...carDetail.trim, ...carDetail.engine]
})

onMounted(()=>{
  carId.value = parseInt(route.params['id'])
  if(user.id != -1){
    request({
      url: '/cars/collection',
      method: 'GET',
      params: {
        userId: user.id,
        carId: carId.value
      }
    }).then((res)=>{
      shine.value = res.data
    })
  }
  pictures.value = [...carDetail.surface, ...carDetail.trim, ...carDetail.engine]
})
</script>

<template>
  <div class="car_casual" @mouseenter="show = true" @mouseleave="show = false">
    <div class="car_casual_main">
      <template v-for="index in 7">
        <img class="car_casual_pic" :src="pictures[(index + ind + pictures.length - 4) % pictures.length]" alt="" onselectstart ='return false'>
      </template>
    </div>
    <div class="show_left" @click="arrowLeft"><el-icon style="font-size: 40px"><ArrowLeftBold /></el-icon></div>
    <div class="show_right" @click="arrowRight"><el-icon style="font-size: 40px"><ArrowRightBold /></el-icon></div>
    <div class="car_casual_down">
      <el-icon style="font-size: 14px"><CopyDocument /></el-icon>
      <div style="margin: 0 6px;font-size: 14px">{{ind + 1}}/{{pictures.length}}</div>
    </div>
    <div class="car_casual_up" v-if="user.id != -1">
      <el-icon class="car_casual_up_star" v-if="!shine" @click="clickStar"><StarFilled /></el-icon>
      <el-icon class="car_casual_up_star_active" v-if="shine" @click="cancelStar"><StarFilled /></el-icon>
    </div>
  </div>
  <div class="car_casual_bottom">
    <div class="car_casual_bottom_main">
      <div class="car_casual_center_arrow">
        <el-icon class="arrow" @click="arrowLeft"><ArrowLeftBold /></el-icon>
      </div>
      <div class="car_casual_center">
        <div class="car_casual_center_main">
          <template v-for="(picture, index) in pictures">
              <el-image class="car_casual_center_box" :class="{car_casual_center_box_active: index == ind}" :src="picture" @click="arrow(index)"/>
          </template>
        </div>
      </div>
      <div class="car_casual_center_arrow">
        <el-icon class="arrow" @click="arrowRight"><ArrowRightBold /></el-icon>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes myFirst
{
  0% {opacity: 0; margin-top: 0}
  50% {opacity: 1; margin-top: -10px}
  100% {opacity: 1; margin-top: 0}
}

.car_casual{
  height: 350px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.car_casual_main{
  margin-left: v-bind(margin_left + 'px');
  display: flex;
  position: relative;
  height: 100%;
  transition: all v-bind(time + 's');
}

.car_casual_pic{
  user-select:none;
  height: 100%;
  width: 500px;
}

.car_casual_down{
  position: absolute;
  bottom: 0;
  left: 0;
  height: 32px;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: right;
  color: white;
  align-items: center;
}

.car_casual_up{
  position: absolute;
  z-index: 990;
  right: 10px;
  top: 10px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.car_casual_up_star{
  color: white;
  font-size: 18px;
}

.car_casual_up_star_active{
  color: #f0a03c;
  font-size: 18px;
  animation: myFirst 0.5s;
}

.show_left{
  z-index: 99;
  position: absolute;
  top: 119px;
  left: 0;
  width: 50px;
  height: 80px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.show_right{
  z-index: 99;
  position: absolute;
  top: 119px;
  right: 0;
  width: 50px;
  height: 80px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.show_right:hover{
  background: black;
}

.show_left:hover{
  background: black;
}

.car_casual_bottom{
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.car_casual_bottom_main {
  height: 65px;
  width: 100%;
  display: flex;
  align-items: center;
}

.car_casual_center{
  display: flex;
  width: 400px;
  height: 65px;
  align-items: center;
  overflow: hidden;
}

.car_casual_center_main{
  height: 65px;
  display: flex;
  align-items: center;
  margin-left: v-bind(bottom_margin + 'px');
  transition: all 0.5s;
}

.car_casual_center_box{
  flex-shrink:0;
  width: 90px;
  height: 59px;
  margin: 0 5px;
  cursor: pointer;
}

.car_casual_center_box_active{
  outline: 3px solid red;
}

.car_casual_center_arrow{
  width: 50px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow{
  color: #bcbcbc;
  font-size: 35px;
  cursor: pointer;
}

.arrow:hover{
  color: #909090;
}
</style>