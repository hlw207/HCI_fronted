<script setup lang="ts">

import {ref} from "vue";
import buyData from "~/pages/home/components/filterBar/components/buyData";
import {ArrowRight} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";
import {choose} from "~/utils/interfaces";

const router = useRouter()

const buyPrice = ref(buyData.buyDataPrice)
const buyType = ref(buyData.buyDataType)
const buyBrand = ref(buyData.buyDataBrand)

const choose = (type: choose) =>{
  let query = {}
  query[type.type] = type.choose
  router.push({path: 'buy', query: query})
}
</script>

<template>
  <div class="filter_box">
    <div class="filter_line">
      <template v-for="price in buyPrice">
        <div class="filter_b" @click="router.push({path: '/buy', query: {price: price}})">{{price}}</div>
      </template>
    </div>
    <div class="filter_line">
      <template v-for="type in buyType">
        <div class="filter_b" @click="choose(type)">{{type.title}}</div>
      </template>
    </div>
    <div class="filter_line">
      <template v-for="brand in buyBrand">
        <div class="filter_b" @click="router.push({path: '/buy',query: {brand: brand.brand}})">
          <el-image class="filter_picture" :src="brand.path"></el-image>
          <div style="margin-top: -2px">{{brand.brand}}</div>
        </div>
      </template>
      <div class="filter_b filter_extra">
        全部品牌
        <div style="font-size: 14px;margin-top: 6px"><el-icon><ArrowRight /></el-icon></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filter_box{
  width: 100%;
  padding-top: 20px;

}

.filter_line{
  margin: 5px 0;
  display: flex;
  align-items: center;
  height: 50px;
}

.filter_b{
  display: flex;
  align-items: center;
  width: 80px;
  font-size: 14px;
  color: rgba(0,0,0,.8);
  letter-spacing: 0.3px;
  cursor: pointer;
}

.filter_b:hover{
  color: #f2711c;
}

.filter_picture{
  width: 18px;
  height: 18px;
  margin-right: 5px;
}

.filter_extra{
  color: rgba(0,0,0,.36);
  margin-top: -2px;
}
</style>