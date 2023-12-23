<script setup lang="ts">

import {onMounted, reactive, ref, watch} from "vue";
import {request} from "~/utils/request";
import {useRoute} from "vue-router";
import DetailShow from "~/pages/detail/components/carBar/components/detailShow.vue";

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

onMounted(() => {
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
});
</script>

<template>
  <div class="car_info">
    <div class="car_info_top">
      {{car.name}} {{car.carAge.substring(0, 4)}}款
    </div>
    <div class="car_info_cards">
      <div class="car_info_card">自营</div>
      <div class="car_info_card">准新车</div>
    </div>
    <div class="car_info_middle">
      <div class="car_info_middle_top">
        <div class="car_info_price">
          {{car.price.toFixed(2)}}
        </div>
        <div style="color: #ff5317;font-size: 14px;margin-top: 20px;margin-left: 2px">万</div>
        <div class="car_info_price_new">
          新车含税{{(car.price * 5).toFixed(2)}}万
        </div>
        <div class="car_info_down">
          <div class="car_info_button" @click="popPrice=true">降价提醒</div>
        </div>
      </div>
      <div class="car_info_middle_bottom">
        <div class="car_info_middle_bottom_text">
          服务费
        </div>
        <div class="car_info_middle_bottom_service">
          {{(car.price * 0.08 * 10000).toFixed(0)}}元（车价×8%）
        </div>
      </div>
    </div>
    <div class="car_info_detail">
      <DetailShow title="表显里程" :content="car.carDistance" />
      <DetailShow title="所在地" :content="car.carPosition" />
      <DetailShow title="上牌时间" :content="car.carAge" />
      <DetailShow title="排量" :content="car.carPollution" />
      <DetailShow title="变速箱" :content="car.carGear" />
      <DetailShow title="过户记录" :content="car.carRecord" />
    </div>
    <div class="car_button_box">
      <div class="car_button button1" @click="popShow = true">预约看车</div>
      <div class="car_button button2" @click="popPrice = true">砍价</div>
    </div>
  </div>
  <PopUp :title="car.name + ' ' + car.carAge.substring(0, 4) + '款'" :show="popShow" :price="car.price" :path="car.picture" @cancel="popShow=false"/>
  <PopPrice :title="car.name + ' ' + car.carAge.substring(0, 4) + '款'" :show="popPrice" :price="car.price" :path="car.picture" @cancel="popPrice=false"/>

</template>

<style scoped>
.car_info{
  margin-left: 60px;
  flex: 1;
}

.car_info_top{
  color: #222;
  font-size: 18px;
  letter-spacing: 1px;
}

.car_info_cards{
  display: flex;
  height: 17px;
  overflow: hidden;
  margin: 13px 0;
  color: #fff;
}

.car_info_card{
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

.car_info_middle{
  background-color: #fafafa;
  padding: 0 20px;
  font-size: 14px;
  padding-bottom: 10px;
}

.car_info_middle_top{
  display: flex;
  height: 50px;
  border-bottom: 2px dashed #ddd;
}

.car_info_price{
  margin-top: 10px;
  font-size: 28px;
  color: #ff5317;
}

.car_info_price_new{
  color: #aaa;
  margin-left: 20px;
  margin-top: 22px;
  font-size: 13px;
}

.car_info_button{
  height: 23px;
  padding: 0 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff6b23;
  background-color: #fff;
  border: 1px solid #ffa14d;
  border-radius: 4px;
  margin-top: 3px;
  margin-right: 10px;
  font-size: 13px;
  cursor: pointer;
}

.car_info_button:hover{
  background: #fca152;
  color: white;
}

.car_info_down{
  flex: 1;
  display: flex;
  justify-content: right;
  align-items: center;
}

.car_info_middle_bottom{
  display: flex;
  align-items: center;
  color: #bbb;
  height: 30px;
}

.car_info_middle_bottom_text{
  margin-top: 6px;
  color: #aaa;
  font-size: 13px;
}

.car_info_middle_bottom_service{
  margin-top: 6px;
  margin-left: 15px;
  color: black;
  font-size: 13px;
}

.car_info_detail{
  width: 90%;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}

.car_button_box{
  display: flex;
}

.car_button{
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 45px;
  font-size: 17px;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.button1{
  margin-right: 20px;
  background-color: #ff6b23;
}

.button1:hover{
  background: #e26126;
}

.button2{
  background-color: #ffa14d;
}

.button2:hover{
  background: #e39049;
}
</style>