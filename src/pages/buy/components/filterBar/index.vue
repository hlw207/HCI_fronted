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
</style>
