<script setup lang="ts">
import {ref} from "vue";
import {CaretBottom, CaretTop} from "@element-plus/icons-vue";
const isShow = ref(false)

const show = ()=>{
  isShow.value = true
}
</script>

<template>
  <div class="extra_container" @mouseenter="show">
    <div>更多</div>
    <div class="extra_icon">
      <el-icon v-if="isShow"><CaretBottom /></el-icon>
      <el-icon v-if="!isShow"><CaretTop /></el-icon>
    </div>
  </div>
  <div>

  </div>
</template>

<style scoped>
.extra_container{
  z-index: 800;
  position: absolute;
  display: flex;
  margin: 5px 0;
  padding: 3px 8px;
  color: black;
  font-size: 11px;
  cursor: pointer;
}

.extra_icon{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  font-size: 12px;
}
</style>