<script setup lang="ts">
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
  <div class="bottom_main">
    <div style="display: flex">
      <div style="display: flex">
          好车不和坏车一起卖&nbsp;&nbsp;
          <span>好车</span>
          <span style="color: #fc6c2c">卖好价</span>
      </div>
      <div style="display: flex">
        <div class="bottom_button buttonA" style="margin-left: 80px;cursor: pointer" @click="router.push('/buy')">
          我要买车
        </div>
        <div class="bottom_button buttonB" @click="router.push('/sell')">我要卖车</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bottom_main{
  display: flex;
  box-sizing: border-box;
  margin-right: 32px;
  background: #f7f7f7;
  height: 90px;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  letter-spacing: 1px;
}

.bottom_button{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  width: 140px;
  font-size: 14px;
  border-radius: 5px;
  color: white;
  margin-left: 20px;
  cursor: pointer;
}

.buttonA{
  background: #fc6c2b;
}

.buttonB{
  background: #fca152;
}

</style>