<script setup lang="ts">


import themes from "~/pages/home/components/themeBar/data";
import ThemeCollection from "~/pages/home/components/themeBar/components/themeCollection.vue";
</script>

<template>
  <div class="theme_bar">
    <template v-for="theme in themes">
      <ThemeCollection :name="theme.name" :title="theme.title" :picture="theme.picture" :marks="theme.marks"/>
    </template>
  </div>
</template>

<style scoped>
.theme_bar{
  margin-right: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 50px 55px;
}

</style>
