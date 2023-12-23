<script setup lang="ts">
import CarCasaul from "~/pages/detail/components/carBar/components/carCasaul.vue";
import CarInfo from "~/pages/detail/components/carBar/components/carInfo.vue";


</script>

<template>
    <div>
        <div class="carDiv">
          <div class="car_filter">
            <CarCasaul />
          </div>
          <CarInfo />
        </div>
    </div>
</template>

<style scoped>
.carDiv {
    margin: 40px 152px 30px 120px;
    height: 450px;
    display: flex;
}

.car_filter{
  width: 500px;
}



</style>
