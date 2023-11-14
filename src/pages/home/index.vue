<template>
  <div class="homeContainer">
    <SearchBar />
    <FilterBar />
    <ThemeBar />
    <RecommendBar />
    <InstructionBar />
  </div>
</template>

<script setup lang="ts">
import SearchBar from "~/pages/home/components/searchBar/index.vue";
import FilterBar from "~/pages/home/components/filterBar/index.vue"
import ThemeBar from "~/pages/home/components/themeBar/index.vue";
import RecommendBar from "~/pages/home/components/recommendBar/index.vue";
import InstructionBar from "~/pages/home/components/instructionBar/index.vue";
</script>

<style scoped lang="scss">
.homeContainer{
  width: 100%;
  background-color: rgba(236, 236, 236, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
