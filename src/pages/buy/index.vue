<script setup lang="ts">

import FilterBar from "~/pages/buy/components/filterBar/index.vue"
import AddBar from "~/pages/home/components/addBar/index.vue";
import {onMounted} from "vue";

onMounted(()=>{
  document.documentElement.scrollTop = 0
})
</script>

<template>
    <div class="buyContainer">
        <FilterBar />
    </div>
   <FindCar/>
   <AddBar />
</template>

<style>
.buyContainer {
    width: 100%;
    align-items: center;
    margin: 0;
}
</style>
