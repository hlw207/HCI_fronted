<script setup lang="ts">

import {CarStruct} from "~/utils/interfaces";
import {onMounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useBuyBottomStore} from "~/stores/buyBottomStore";
import CarFilter from "~/pages/buy/components/filterBar/carFilter.vue";
import BuyBottomBar from "~/pages/buy/components/bottomBar/buyBottomBar.vue";
import CarCollection from "~/pages/buy/components/filterBar/carCollection.vue";

const cars_list = ref([] as CarStruct[][])
const cars = useBuyBottomStore();
const router = useRouter()

watch(cars,()=>{
  changeCollection()
})

onMounted(()=>{
  changeCollection()
})

const changeCollection = () =>{
  cars_list.value = []
  let i : number;
  for(i = 0;i < 8;i++){
    let collection: CarStruct[] = []
    let j : number
    for (j = 0;j < 4;j++) {
      if(4 * i + j < cars.cars.length){
        let info: CarStruct = cars.cars[4 * i + j]
        collection.push(info)
      }
    }
    if(collection.length != 0)
      cars_list.value.push(collection)
  }
}
</script>

<template>
    <div class="car-buying-page">
        <car-filter/>
        <div class="car-collection">
          <template v-for="collection_line in cars_list">
            <div class="collection_line">
              <template v-for="collection in collection_line">
                <CarCollection :id="collection.id" :image="collection.image" :price="collection.price" :name="collection.name" :time="collection.time" :mileage="collection.mileage" :source="collection.source" :color="collection.color" :shine="collection.shine"/>
              </template>
            </div>
          </template>
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
  margin: 20px 0;
}

.collection_line{
  display: flex;
  margin-bottom: 15px;
}
</style>
