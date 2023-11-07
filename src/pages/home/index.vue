<template>
  <div class="homeContainer">
    <SearchBar />
  </div>
</template>

<script setup lang="ts">
import SearchBar from "~/pages/home/components/searchBar/index.vue";
</script>

<style scoped lang="scss">
.homeContainer{
  width: 100%;
  height: 1500px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}
</style>
