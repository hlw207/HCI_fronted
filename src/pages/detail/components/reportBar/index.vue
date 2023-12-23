<template>
    <div class="reportDiv">
      <el-image style="width: 100%" src="../../../public/pictures/record.png"></el-image>
      <div class="confirm" @click="popShow=true">免费咨询车况</div>
    </div>
   <PopUp :title="car.name + ' ' + car.carAge.substring(0, 4) + '款'" :show="popShow" :price="car.price" :path="car.picture" @cancel="popShow=false"/>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {request} from "~/utils/request";
import {useRoute} from "vue-router";

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

const route = useRoute()
const popShow = ref(false)

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

<style scoped>
.reportDiv {
    position: relative;
    margin: 40px 152px 30px 120px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */
}

.confirm{
  position: absolute;
  z-index: 1;
  left: 50px;
  top: 304px;
  width: 225px;
  height: 36px;
  border: 1px solid #ff6b23;
  background: white;
  cursor: pointer;
  color: #ff6b23;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.5s;
}

.confirm:hover{
  background: #ff6b23;
  color: white;
}
</style>
