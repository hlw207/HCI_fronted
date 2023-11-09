<script setup lang="ts">

import UserMenu from "~/components/userMenu.vue";
import Right_side from "~/components/right_side.vue";
import {ref} from "vue";

const ifFixed = ref(true)
</script>

<template>
  <Right_side />
  <UserMenu page-index="/" :ifFixed="ifFixed" />
  <div>
    Hello,World
  </div>
  <div class="triangle"></div>
  <div>hlw</div>
  <div style="height: 1000px"></div>
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