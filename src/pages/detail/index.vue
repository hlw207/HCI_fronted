<template>
    <div class="detailContainer">
        <CarBar />
        <SimilarBar />
        <ReportBar />
        <PictureBar />
        <ConfigBar />
        <BottomBar/>
        <ShowBar/>
    </div>
</template>

<script setup lang="ts">

import CarBar from "~/pages/detail/components/carBar/index.vue"
import SimilarBar from "~/pages/detail/components/similarBar/index.vue"
import ReportBar from "~/pages/detail/components/reportBar/index.vue"
import PictureBar from "~/pages/detail/components/pictureBar/index.vue"
import ConfigBar from "~/pages/detail/components/configBar/index.vue"
import BottomBar from "~/pages/home/components/bottomBar/index.vue"
import ShowBar from "~/pages/detail/components/showBar/index.vue"

import {onMounted, watch} from "vue";
import {useCarDetailData} from "~/stores/carDetailData";
import {useRoute} from "vue-router";

const carDetail = useCarDetailData()
const route = useRoute()

watch(()=>route.params['id'], ()=>{
  document.documentElement.scrollTop = 0
  carDetail.fetch(parseInt(route.params['id']))
})

onMounted(()=>{
  document.documentElement.scrollTop = 0
  carDetail.fetch(parseInt(route.params['id']))
})
</script>

<style>
.detailContainer {
    width: 100%;
    height: fit-content;
    align-items: center;
    margin: 0;
}


</style>
