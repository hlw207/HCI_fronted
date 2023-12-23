<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <div @click="router.push('join')">
    <div class="picture_up">
      <div>赛赛车合伙人</div>
    </div>
    <el-image class="picture" src="https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/left_part.png"></el-image>
  </div>
</template>

<style scoped>
.picture{
  position: fixed;
  z-index: 998;
  left: 0;
  bottom: 0;
  cursor: pointer;
}

.picture_up{
  position: fixed;
  z-index: 999;
  left: 15px;
  bottom: 38px;
  width: 144px;
  height: 40px;
  background: #fb6613;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fffefe;
  font-size: 20px;
  letter-spacing: 1px;
  cursor: pointer;
}
</style>