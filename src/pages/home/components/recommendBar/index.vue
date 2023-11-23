<template>
  <div class="recommendBarContainer">
    <div class="recommendBarHeader">
      <el-text style="color: #eda01f;font-size: 25px;position: relative;top: 20px;left: 20px" tag="b">好车推荐</el-text>
    </div>
    <el-tabs :tab-position="tabPosition" style="margin-top: 20px" @tab-click="handleRequestCars">
      <el-tab-pane v-for="(item,index) in recommends" :label="item.name" >
        <div class="recommenderCarBarContainer">
          <div v-for="line in carBarCount " class="recommendCarBar">
            <div v-for="(car,index) in item.cars.slice((line - 1) * 3,line * 3)" class="singleCar">
              <img
                  src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                  class="carImage"
              />
              <div style="padding: 14px">
                <span>五菱汽车 宏光MINI EV</span>
                <div class="bottom">
                  <time class="time">2023-11</time>
                  <el-button text class="button">查看详情</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>


      </el-tab-pane>
    </el-tabs>

    <div class="recommendBarFoot">
      <el-button color="#eda01f" style="width: 180px;height: 50px" plain>查看更多</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

const tabPosition = ref('left')

const carBarCount = ref(1)

const cars = [
  {
    name: '奔腾B70',
    time: '2023年',
    price: '7.7万'
  },
  {
    name: '奔腾B70',
    time: '2023年',
    price: '7.7万'
  },
  {
    name: '奔腾B70',
    time: '2023年',
    price: '7.7万'
  },
  {
    name: '奔腾B70',
    time: '2023年',
    price: '7.7万'
  },
  {
    name: '奔腾B70',
    time: '2023年',
    price: '7.7万'
  },
  {
    name: '奔腾B70',
    time: '2023年',
    price: '7.7万'
  },
]

const recommends = ref([
  {
    name: '最新上架',
    cars: []
  },
  {
    name: '降价急售',
    cars: []
  },
  {
    name: '最新上架',
    cars: []
  },
  {
    name: '准新车',
    cars: []
  },
  {
    name: '新能源',
    cars: []
  }
])

onMounted(() => {
  recommends.value[0].cars = cars
  carBarCount.value =  recommends.value[0].cars.length > 3 ? 2 : 1
})


const handleRequestCars = (tab) => {
  if(recommends.value[tab.index].cars.length == 0){
    recommends.value[tab.index].cars = cars
    carBarCount.value =  recommends.value[tab.index].cars.length > 3 ? 2 : 1
  }
}


</script>

<style>
.el-tabs__item.is-active {
  color: #eda01f;
}

.el-tabs__item:hover {
  color: #eda01f;
}

.el-tabs__item{
  font-size:20px !important;
  color: #8c8c8c;
  margin: 10px;

}

.el-tabs__active-bar {
  background-color: #eda01f;
}
</style>

<style scoped>
.recommendBarContainer{
  display: flex;
  flex-direction: column;
  width: 82%;
  min-height: 150px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-top: 10px;
}

.recommendBarHeader{
  width: 100%;
  height: 100px;
}

.recommendBarFoot{
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.recommenderCarBarContainer{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}



.recommendCarBar{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.singleCar{
  width: 300px;
  height: 260px;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px;
}

.singleCar:hover{
  border: 1px solid rgba(175, 175, 175, 0.5);
}


.carImage {
  width: 100%;
  height: 60%;
  display: block;
  border-radius: 5px;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

</style>
