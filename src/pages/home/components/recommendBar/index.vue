<template>
  <div class="recommendBarContainer">
    <div class="recommendBarHeader">
      <el-text style="color: #eda01f;font-size: 25px;position: relative;top: 20px;left: 20px" tag="b">好车推荐</el-text>

    </div>
    <el-tabs :tab-position="tabPosition" style="height: 300px" class="demo-tabs">
      <el-tab-pane label="最新上架">User</el-tab-pane>
      <el-tab-pane label="降价急售">Config</el-tab-pane>
      <el-tab-pane label="准新车">Role</el-tab-pane>
      <el-tab-pane label="练手车">Task</el-tab-pane>
    </el-tabs>

    <div class="recommendBarFoot">
      <el-button color="#eda01f" style="width: 180px;height: 50px" plain>查看更多</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const tabPosition = ref('left')
</script>

<style>

</style>

<style scoped>
.recommendBarContainer{
  display: flex;
  flex-direction: column;
  width: 82%;
  min-height: 150px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-top: 50px;
}

.recommendBarHeader{
  width: 100%;
  height: 100px;
}

.recommendBarFoot{
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}




</style>
