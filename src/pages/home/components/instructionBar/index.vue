<template>
  <div class="instructionContainer">
    <div class="instructionTitle">
      <el-text style="color: #ff6b23;font-size: 30px;" tag="b">交易流程</el-text>
    </div>
    <div class="instructionDetail">
      <div style="position: relative; top: 35%">
        <InstructionIcon icon-u-r-l="/public/pictures/home/instruction01.png" title="预约卖车" content="一键预约，免费服务" />
      </div>
      <el-icon size="30px" style="position: relative;top: 25%;color: #ff6b23;margin: 30px">
        <TopRight />
      </el-icon>
      <div style="position: relative; top:5%">
        <InstructionIcon icon-u-r-l="/public/pictures/home/instruction02.png" title="坐等上门评估" content="上门检测，提供建议价" />
      </div>
      <el-icon size="30px" style="position: relative;top: 25%;color: #eda01f;margin: 30px">
        <BottomRight />
      </el-icon>
      <div style="position: relative; top: 35%;max-height: 180px">
        <InstructionIcon icon-u-r-l="/public/pictures/home/instruction03.png" title="买家上门看车" content="专属顾问，买车省心" />
      </div>
      <el-icon size="30px" style="position: relative;top: 25%;color: #eda01f;margin: 30px">
        <TopRight />
      </el-icon>
      <div style="position: relative; top: 5%">
        <InstructionIcon icon-u-r-l="/public/pictures/home/instruction04.png" title="交易过户" content="管家式过户协办，专业高效" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {BottomRight, Edit, Picture, TopRight, Upload} from "@element-plus/icons-vue";
import InstructionIcon from './components/InstructionIcon.vue'

</script>

<style scoped>
.instructionContainer{
  margin-right: 32px;
  height: 300px;
  margin-top: 30px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  padding: 15px 0;
}

.instructionTitle{
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.instructionDetail{
  margin-top: 5px;
  margin-right: 65px;
  width:80%;
  height: 100%;
  display: flex;
  flex-direction: row;
}

</style>
