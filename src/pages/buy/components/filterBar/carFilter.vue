<script setup lang="ts">
import {useCarsData} from "~/stores/carsData";
import {computed, onMounted, reactive, ref, watch} from "vue";
import TypeChoice from "~/pages/buy/components/filterBar/typeChoice.vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {Search} from "@element-plus/icons-vue";
import ChooseBox from "~/pages/buy/components/filterBar/chooseBox.vue";
import ExtraBox from "~/pages/buy/components/filterBar/extraBox.vue";

const router = useRouter()
const carsData = useCarsData()
const choice = reactive({
  brand: '不限',
  carType: '不限',
  price: '不限',
})

const startPrice = ref('')
const endPrice = ref('')
const show = ref(true)
const isShow = computed(()=>{
  let result = false
  Object.values(choice).forEach(value => {
    if(value != '不限'){
      result = true
    }
  });
  return result
})


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

watch(choice,()=>{
  show.value = false
  setTimeout(()=>{
    show.value = true
  },1)
  let querys = {}
  Object.keys(choice).forEach(key => {
    if(choice[key] != '不限'){
      querys[key] = choice[key]
    }
  });
  router.push({path: '/buy',query: querys})
})

const choose = (type : string, title: string) =>{
  if(type == "brands"){
    choice.brand = title;
    carsData.getCarTypes(choice.brand)
  }else if(type == "carTypes"){
    choice.carType = title;
  }else if(type == "prices"){
    if(carsData.prices.length > 9){
      carsData.prices.pop()
    }
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

const clickItem = (n : number)=>{
  if(n == 0){
    router.push('/home')
  }else if(n == 1){
    choose("brands","不限")
  }else if(n == 2){
    choose("brands",choice.brand)
  }
}

const cancel = (type : string) =>{
  choice[type] = '不限'
}

const clear = () => {
  Object.keys(choice).forEach(key => {
    choice[key] = '不限'
  });
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

  if(startPrice.value  + "-" + endPrice.value+ "万" == "0-3万"){
    choice.price = '3万以下'
    return;
  }else if(startPrice.value  + "-" + endPrice.value+ "万" == "30-1000万"){
    choice.price = '30万以上'
    return;
  }
  let i:number
  for (i = 0;i < carsData.prices.length;i++){
    if(startPrice.value  + "-" + endPrice.value+ "万" == carsData.prices[i]){
      choice.price = carsData.prices[i]
      return;
    }
  }

  carsData.prices.push(startPrice.value  + "-" + endPrice.value+ "万")
  choice.price =  carsData.prices[carsData.prices.length - 1]
}

onMounted(()=>{
  carsData.fetch()
})
</script>

<template>
  <div class="top_show" v-if="show"></div>

  <div class="top_container">
    <div class="top_text" @click="clickItem(0)">二手车主页</div>
    <div class="top_text extra_text"> > </div>
    <div class="top_text" @click="clickItem(1)">二手车出售</div>
    <div class="top_text extra_text" v-if="choice.brand != '不限'"> > </div>
    <div class="top_text" v-if="choice.brand != '不限'" @click="clickItem(2)"> {{choice.brand}} </div>
    <div class="top_text extra_text" v-if="choice.carType != '不限'"> > </div>
    <div class="top_text" v-if="choice.carType != '不限'" @click="clickItem(3)"> {{choice.carType}} </div>
    <div class="top_search">
      <div class="top_search_left">
        <input class="top_search_input" placeholder="二手车搜索"/>
      </div>
      <div class="top_search_right">
        <el-icon style="margin-left: 20%"><Search /></el-icon>
      </div>
    </div>
  </div>

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
    <div class="filter-extra">
      <div class="filter-title">更多:</div>
      <div class="filter-main">
        <ExtraBox :choose="[{choose:false,type:'123'},{choose:false,type:'123'},{choose:false,type:'123'},{choose:false,type:'123'},{choose:false,type:'123'}]" type="何立伟"/>
        <ExtraBox :choose="[]" type="何立伟123"/>
      </div>
    </div>
  </div>

  <div class="filter-bottom">
    <div v-if="isShow" style="margin-right: 10px">已选: </div>
    <template v-for="(content, key) in choice">
      <ChooseBox :content=content :type="key" @cancel="cancel" v-if="content != '不限'"/>
    </template>
    <div v-if="isShow" class="bottom_text" @click="clear">重置条件</div>
  </div>
</template>

<style scoped>
@keyframes myFirst
{
  0% {width: 0}
  100% {width: 100%}
}

.top_show{
  top: 0;
  left: 0;
  position: fixed;
  height: 1.5px;
  width: 0;
  background: #fc6c2b;
  animation: myFirst 0.3s;
}

.top_container{
  position: relative;
  display: flex;
  align-items: center;
  height: 65px;
}

.top_text{
  margin-right: 10px;
  font-size: 11px;
  color: #7c7c7c;
  cursor: pointer;
}

.extra_text{
  margin-top: 1px;
  pointer-events: none;
}

.top_search{
  display: flex;
  align-items: center;
  position: absolute;
  right: 20px;
  width: 220px;
  height: 32px;
  border-radius: 50px;
  border: 1px solid rgba(128, 128, 128, 0.3);
}

.top_search:focus-within{
  border: 1px solid #f2711c;
}

.top_search_left{
  display: flex;
  align-items: center;
  width: 82%;
  height: 100%;
  border-radius: 50px 0 0 50px;
}

.top_search_input{
  border: none;
  box-shadow:none;
  outline: none;
  font-size: 13px;
  margin-left: 5%;
  width: 95%;
  height: 80%;
}

.top_search_input::placeholder{
  font-size: 11px;
  color: #9ba3af;
}

.top_search_right{
  display: flex;
  align-items: center;
  width: 18%;
  height: 100%;
  border-radius:0 50px 50px 0;
  cursor: pointer;
}

.top_search_right:hover{
  color: white;
  background: #f2711c;
}

.top_text:hover{
  color: #f2711c;
}

.filter-container {
  width: 100%;
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
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
}

.filter-extra{
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

.filter-bottom{
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  align-items: center;
  font-size: 11px;
}

.bottom_text{
  margin-left: 10px;
  cursor: pointer;
}

.bottom_text:hover{
  color: #f2711c;
}
</style>