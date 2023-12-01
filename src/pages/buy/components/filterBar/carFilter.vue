<script setup lang="ts">
import {useCarsData} from "~/stores/carsData";
import {onMounted, reactive, ref, watch} from "vue";
import TypeChoice from "~/pages/buy/components/filterBar/typeChoice.vue";
import {ElMessage} from "element-plus";

const carsData = useCarsData()
const choice = reactive({
  brand: "不限",
  carType: "不限",
  price: "不限",
})

const startPrice = ref('')
const endPrice = ref('')

watch(startPrice, ()=>{
  let num = parseInt(startPrice.value);
  if(isNaN(num))
    startPrice.value = startPrice.value.substring(0, startPrice.value.length - 1)
  else
    startPrice.value = num.toString()
})

watch(endPrice, ()=>{
  let num = parseInt(endPrice.value);
  if(isNaN(num))
    endPrice.value = endPrice.value.substring(0,endPrice.value.length - 1)
  else
    endPrice.value = num.toString()
})

const choose = (type : string, title: string) =>{
  if(type == "brands"){
    choice.brand = title;
    carsData.getCarTypes(choice.brand)
  }else if(type == "carTypes"){
    choice.carType = title;
  }else if(type == "prices"){
    if(title == '不限'){
      startPrice.value = endPrice.value= ''
    }else if (title == '3万以下'){
      startPrice.value = '0'
      endPrice.value = '3'
    }else if(title == '30万以上'){
      startPrice.value = '30'
      endPrice.value = '1000'
    }else {
      let spilt = title.split('-')
      startPrice.value = spilt[0]
      endPrice.value = spilt[1].substring(0, spilt[1].length - 1)
    }
    choice.price = title;
  }
}

const certainNum = () =>{
  if(parseInt(endPrice.value) <= parseInt(startPrice.value)){
    ElMessage.warning("第二个值要更大哦")
    startPrice.value = endPrice.value = ''
    return
  }
  if(carsData.prices.length > 9){
    carsData.prices.pop()
  }
  carsData.prices.push(startPrice.value  + "-" + endPrice.value+ "万")
  choice.price =  carsData.prices[carsData.prices.length - 1]
}

onMounted(()=>{
  carsData.fetch()
})
</script>

<template>
  <div class="filter-container">
    <div class="filter-brand">
      <div class="filter-title">品牌:</div>
      <div class="filter-main">
        <template v-for="brand in carsData.brands">
          <TypeChoice :title="brand" type="brands" :choice="choice.brand" @choose="choose"/>
        </template>
      </div>
    </div>
    <div class="filter-types">
      <div class="filter-title">车系:</div>
      <div class="filter-main">
        <template v-for="carType in carsData.carTypes">
          <TypeChoice :title="carType" type="carTypes" :choice="choice.carType" @choose="choose"/>
        </template>
      </div>
    </div>
    <div class="filter-prices">
      <div class="filter-title">价格:</div>
      <div class="filter-main">
        <template v-for="price in carsData.prices">
          <TypeChoice :title="price" type="prices" :choice="choice.price" @choose="choose"/>
        </template>
        <div class="filter-input" style="margin-left: 10px">
          <input v-model="startPrice" class="filter-input-main"/>
          <div style="font-size: 12px;margin-top: 6px;margin-left: 13px">万</div>
        </div>
        <div style="margin-top: 6px;margin-left:5px;margin-right:5px;font-size: 15px;color: #9ba3af ">-</div>
        <div class="filter-input">
          <input v-model="endPrice" class="filter-input-main"/>
          <div style="font-size: 12px;margin-top: 6px;margin-left: 13px">万</div>
        </div>
        <div class="filter-certain" @click="certainNum" v-if="endPrice!=''&&startPrice!=''">确 定</div>
      </div>
    </div>
    <div></div>
  </div>
</template>

<style scoped>
.filter-container {
  width: 100%;
  margin-top: 30px;
  background: #f8f8f8;
  border-radius: 0;
}

.filter-brand{
  display: flex;
  margin: 0 12px;
  padding: 5px 40px 5px 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
}

.filter-types{
  display: flex;
  margin: 0 12px;
  padding: 5px 0;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
}

.filter-prices{
  display: flex;
  margin: 0 12px;
  padding: 5px 0;
}

.filter-main{
  width: 97%;
  display: flex;
  flex-wrap: wrap;
}

.filter-title{
  width: 3%;
  margin: 5px 0;
  padding: 3px 8px;
  color: #8d9193;
  font-size: 11px;
}

.filter-input{
  display: flex;
  height: 95%;
  border-radius: 0;
  width: 80px;
  background: white;
  outline: 1px solid rgba(128, 128, 128, 0.2);
}

.filter-input-main{
  padding-left: 8px;
  border: none;
  box-shadow:none;
  outline: none;
  font-size: 11px;
  width: 40px;
}

.filter-input-main:focus{
  border: none;
  box-shadow:none;
  outline: none;
}

.filter-input:focus-within{
  outline: 1px solid #f2711c;
}

.filter-certain{
  margin: 1px 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  background: #fc6c2b;
  color: white;
  border-radius: 1px;
  cursor: pointer;
}

</style>