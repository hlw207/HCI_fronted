<script setup lang="ts">
import {ref} from "vue";

const show = ref(true)
</script>

<template>
  <div style="background: #f2711c;width: 100px;height: 30px;position: relative">
    <CascaderChoose @disShow="show = false" :top="30" :left="0" :is-show="show"/>
  </div>
</template>

<style scoped>
.flex{
  display: flex;
  width: 100px;
  background: #db2828;
  flex-wrap: wrap;
}

.flex1{
  width: 31%;
  margin: 1%;
  background: #26aeea;
}
</style>