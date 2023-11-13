<template>
  <div class="homeContainer">
    <SearchBar />
    <FilterBar />
    <ThemeBar />
    <RecommendBar />
  </div>
</template>

<script setup lang="ts">
import SearchBar from "~/pages/home/components/searchBar/index.vue";
import FilterBar from "~/pages/home/components/filterBar/index.vue"
import ThemeBar from "~/pages/home/components/themeBar/index.vue";
import RecommendBar from "~/pages/home/components/recommendBar/index.vue";
</script>

<style scoped lang="scss">
.homeContainer{
  width: 100%;
  height: 1500px;
  background-color: rgba(236, 236, 236, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
