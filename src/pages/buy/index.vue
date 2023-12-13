<script setup lang="ts">

import FilterBar from "~/pages/buy/components/filterBar/index.vue"
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
</template>

<style>
.buyContainer {
    width: 100%;
    align-items: center;
    margin: 0;
}
</style>
