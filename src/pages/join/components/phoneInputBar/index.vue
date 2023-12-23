<template>
  <div class="fixInputContainer">
    <div class="fixInput">
      <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;width: 80%">
        <div style="width: 180px;height: 40px;display: flex;flex-direction: column;justify-content: start;align-items: center;margin-top: -15px;margin-right: 10px">
          <div style="font-weight: bold;font-size: 20px;color: #f2711c;margin-bottom: -10px">
            加盟热线
          </div>
          <div style="color: #f2711c;font-size: 20px">
            <p>400-123-123</p>
          </div>
        </div>
        <el-input
            v-model="phoneNumber"
            minlength="11"
            maxlength="11"
            type="tel"
            placeholder="请输入手机号"
            style="width: 80%;height: 40px;margin-right: 10px"
        />
        <el-button color="#f2711c"  style="/margin-left: 20px;color: white;height: 40px">立刻报名</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const phoneNumber = ref()
</script>

<style scoped>
.fixInputContainer{
  position: fixed;
  margin-right: 32px;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 999;
}

.fixInput{
  width: 600px;
  height: 100px;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px 2px #bbbbbb;
}
</style>
