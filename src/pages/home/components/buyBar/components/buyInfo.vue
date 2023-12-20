<script setup lang="ts">
const props = defineProps<{
  path: string,
  person: string,
  car: string,
  price: number,
  content: string
}>()
</script>

<template>
  <div class="buy_info">
    <div class="buy_info_main">
      <div class="buy_picture">
        <el-image style="z-index: 0;width: 100%;height: 100%" :src="props.path" />
      </div>
      <div class="buy_bottom">
        <div class="buy_text">买家：{{props.person}}</div>
        <div class="buy_text">{{props.car}}：{{props.price}}万元</div>
        <div class="buy_content">
          {{props.content}}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.buy_info{
  position: relative;
  box-sizing: border-box;
  flex: 1;
  margin: 0 12px;
  height: 100%;
  background: white;
}

.buy_info_main{
  height: 315px;
  overflow: hidden;
}

.buy_picture{
  height: 175px;
}

.buy_bottom{
  position: absolute;
  top: 175px;
  z-index: 999;
  height: 140px;
  padding-top: 25px;
  background: white;
  transition: all 0.5s;
  cursor: pointer;
  overflow: hidden;
}

.buy_bottom:hover{
  z-index: 999;
  margin-top: -175px;
  height: 315px;
}

.buy_text{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  color: rgba(0, 0, 0, 0.8);
}

.buy_content {
  margin-top: 15px;
  padding: 0 20px;
  font-size: 14px;
  color: rgba(0, 0, 0, .36);
  letter-spacing: 0.3px;
  line-height: 2.5;
}
</style>