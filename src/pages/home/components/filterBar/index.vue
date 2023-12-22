<template>
  <div class="filter_bar">
    <div class="filterContainer">
      <div class="filterBuyContainer">
        <div class="filterTitle" style="margin-left: 32px">
          <el-text style="font-size: 20px;color: black">我要买车</el-text>
          <Filter />
        </div>
      </div>
      <div class="filterSellContainer">
        <div class="filterTitle" style="margin-top: 42px">
          <el-text style="font-size: 20px;color: black">我要卖车</el-text>
          <Sell />
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import Filter from '~/pages/home/components/filterBar/components/filter.vue'
import Sell from '~/pages/home/components/filterBar/components/sell.vue'


</script>

<style>

.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color:#eda01f;
  border-color:#eda01f;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #eda01f;
}
.el-checkbox.is-bordered.is-checked{
  border-color: #eda01f;
}
.el-checkbox__input.is-focus .el-checkbox__inner{
  border-color:  #eda01f;
}
</style>

<style scoped lang="scss">
.filter_bar{
  position: relative;
  z-index: 1;
  margin-right: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filterContainer{
  width: 90%;
  background-color: #fff;
  border: 1px solid #a6a6a6;
  border-radius: 5px;
  margin-top: -20px;
  display: flex;
  margin-bottom: 60px;
  padding-bottom: 10px;
}

.filterBuyContainer{
  box-sizing: border-box;
  width: 65%;
  padding: 10px;
}

.filterSellContainer{
  margin-left: 60px;
  width: 35%;
  display: flex;
  flex-direction: column;
}

.filterTitle{
  width: 100%;
  margin-top: 30px;
}

</style>
