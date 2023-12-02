<template>
    <div class="detailContainer">
<!--        <SearchBar />-->
        <CarBar />
        <SimilarBar />
        <ReportBar />
        <PictureBar />
        <ConfigBar />
    </div>
</template>

<script setup lang="ts">

import SearchBar from "~/pages/detail/components/searchBar/index.vue"
import CarBar from "~/pages/detail/components/carBar/index.vue"
import SimilarBar from "~/pages/detail/components/similarBar/index.vue"
import ReportBar from "~/pages/detail/components/reportBar/index.vue"
import PictureBar from "~/pages/detail/components/pictureBar/index.vue"
import ConfigBar from "~/pages/detail/components/configBar/index.vue"

</script>

<style>
.detailContainer {
    width: 100%;
    height: fit-content;
    align-items: center;
    margin: 0;
}


</style>
