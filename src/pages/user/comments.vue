<script setup lang="ts">
import {useWindowStore} from "~/stores/window";

const window = useWindowStore()
const width = window.width
const height = window.height - 45
</script>
<template>
  <div class="user_main">
    123
  </div>
</template>

<route lang="yaml">
  meta:
    layout: user
</route>

<style scoped>
.user_main{
  height: v-bind(height - height / 5 - 54 + 'px');
  margin-right: 32px;
  padding: 0 v-bind(width / 11 + 'px');
  background: #f7f4f5;
}
</style>