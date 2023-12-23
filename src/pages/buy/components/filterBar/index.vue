<script setup lang="ts">

import {useBuyBottomStore} from "~/stores/buyBottomStore";
import CarFilter from "~/pages/buy/components/filterBar/carFilter.vue";
import BuyBottomBar from "~/pages/buy/components/bottomBar/buyBottomBar.vue";
import CarCollection from "~/pages/buy/components/filterBar/carCollection.vue";

const cars = useBuyBottomStore();

</script>

<template>
    <div class="car-buying-page">
        <car-filter/>
        <div class="car-collection">
          <template v-for="collection_line in cars.cars">
            <div class="collection_line">
              <template v-for="collection in collection_line">
                <CarCollection :id="collection.id" :image="collection.image" :price="collection.price" :name="collection.name" :time="collection.time" :mileage="collection.mileage" :source="collection.source" :color="collection.color"/>
              </template>
            </div>
          </template>
          <div class="car_not" v-if="cars.cars.length == 0">
            <el-image class="car_not_picture" src="https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/not_find.png"></el-image>
          </div>
        </div>
        <buy-bottom-bar/>
    </div>
</template>

<style>
.car-buying-page {
    margin-right: 32px;
    padding: 5px 10%;
}

.car-collection{
  margin: 10px 0;
}

.collection_line{
  display: flex;
  margin-bottom: 15px;
}

.car_not{
  display: flex;
  align-items: center;
  justify-content: center;
}

.car_not_picture{
  width: 400px;
}
</style>
