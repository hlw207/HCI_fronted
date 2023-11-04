<script setup lang="ts">

import User_menu from "~/components/user_menu.vue";
import Right_side from "~/components/right_side.vue";
</script>

<template>
  <Right_side />
  <User_menu  page-index="/"/>
  <div>
    Hello,World
  </div>
  <div class="triangle"></div>
  <div>hlw</div>
</template>

<style scoped>
.triangle {
  z-index: -1;
  position: absolute;
  width: 0;
  height: 0;
  border: 100px solid;
  border-color: orangered skyblue gold yellowgreen;
}
</style>