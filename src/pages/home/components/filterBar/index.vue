<template>
  <div class="filterContainer">
    <div class="filterBuyContainer">
      <div class="filterTitle">
        <el-text tag="b" style="font-size: 22px">我要买车</el-text>
        <Filter />
      </div>
    </div>
    <div class="filterSellContainer">
      <div class="filterTitle">
        <el-text tag="b" style="font-size: 22px">我要卖车</el-text>
        <Sell />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {ref} from "vue";
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
.filterContainer{
  margin-right: 32px;
  width: 80%;
  height: 300px;
  background-color: #fff;
  border: 1px solid #a6a6a6;
  border-radius: 10px;
  margin-top: -100px;
  display: flex;
  flex-direction: row;
}

.filterBuyContainer{
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.filterSellContainer{
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.filterTitle{
  width: 100%;
  margin-top: 30px;
  margin-left: 30px;
}

</style>
