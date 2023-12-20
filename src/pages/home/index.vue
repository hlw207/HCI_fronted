<template>
  <div class="homeContainer">
    <SearchBar />
    <FilterBar />
    <ThemeBar />
    <RecommendBar />
    <InstructionBar />
    <BuyBar />
    <NewsBar />
    <BottomBar />
  </div>
</template>

<script setup lang="ts">
import SearchBar from "~/pages/home/components/searchBar/index.vue";
import FilterBar from "~/pages/home/components/filterBar/index.vue"
import ThemeBar from "~/pages/home/components/themeBar/index.vue";
import RecommendBar from "~/pages/home/components/recommendBar/index.vue";
import InstructionBar from "~/pages/home/components/instructionBar/index.vue";
import BuyBar from "~/pages/home/components/buyBar/index.vue";
import NewsBar from "~/pages/home/components/newsBar/index.vue";
import BottomBar from "~/pages/home/components/bottomBar/index.vue";
</script>

<style scoped lang="scss">
.homeContainer{
  width: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
