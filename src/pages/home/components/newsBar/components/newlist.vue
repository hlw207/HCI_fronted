<script setup lang="ts">
import {useRouter} from "vue-router";

const props = defineProps<{
  title : string
  link : string
}>()

const router = useRouter()
const router_to = () =>{
  window.location.href=props.link
}
</script>

<template>
  <div class="new_main" @click="router_to">
    <div class="new_left"></div>
    <div class="new_right">{{props.title}}</div>
  </div>
</template>

<style scoped>
.new_main{
  width: 33%;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  cursor: pointer;
}

.new_left{
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: rgba(0,0,0,.14);
  margin-right: 8px;
}

.new_right{
  font-size: 14px;
}

.new_main:hover .new_right{
  color: #ff6b23;
}
</style>