<script setup lang="ts">
import {useCarsData} from "~/stores/carsData";
import {computed, onMounted, reactive, ref, watch} from "vue";
import TypeChoice from "~/pages/buy/components/filterBar/typeChoice.vue";
import {ElMessage} from "element-plus";
import {useRoute, useRouter} from "vue-router";
import {Close, Search} from "@element-plus/icons-vue";
import ChooseBox from "~/pages/buy/components/filterBar/chooseBox.vue";
import ExtraBox from "~/pages/buy/components/filterBar/extraBox.vue";
import WholeBrand from "~/pages/buy/components/filterBar/wholeBrand.vue";
import carChoice from "~/pages/buy/components/filterBar/carChoice";
import {useBuyBottomStore} from "~/stores/buyBottomStore";

const route = useRoute()
const router = useRouter()
const cars = useBuyBottomStore()
const carsData = useCarsData()
const choice = reactive({
  brand: '不限',
  carType: '不限',
  price: '不限',
})

const extraChoice = reactive({
  carLevel: carChoice.carLevel,
  carDetailType: carChoice.carDetailType,
  carAge: carChoice.carAge,
  carPollution: carChoice.carPollution,
  carDistance: carChoice.carDistance,
  carColor: carChoice.carColor,
  carGear: carChoice.carGear
})

const extraChoiceName = reactive({
  carLevel: '车辆级别',
  carDetailType: '车辆类型',
  carAge: '车龄',
  carPollution: '排量',
  carDistance: '里程',
  carColor: '颜色',
  carGear: '变速箱'
})

const searchShow = ref(false)

const searchInfo = ref('')
const searchStore = ref('')
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
  Object.values(extraChoice).forEach(value => {
    let i: number
    for(i = 0;i < value.length;i++){
      if(value[i].choose)
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
  request_to()
})

watch(extraChoice,()=>{
  show.value = false
  setTimeout(()=>{
    show.value = true
  },1)
  request_to()
})

const request_to = () =>{
  let querys = {}
  if(searchInfo.value != '')
    querys['search'] = searchInfo.value
  Object.keys(choice).forEach(key => {
    if(choice[key] != '不限'){
      querys[key] = choice[key]
    }
    if(key == 'price') {
      if(startPrice.value == '' && endPrice.value == '') {
        cars.carRequest.price = '不限'
      }else
        cars.carRequest.price = startPrice.value + '-' + endPrice.value
    }
    else {
      cars.carRequest[key] = choice[key]
    }
  });
  Object.keys(extraChoice).forEach(key => {
    let c = ""
    let i: number
    for (i = 0;i < extraChoice[key].length;i++){
      if(extraChoice[key][i].choose){
        if(c == "")
          c = extraChoice[key][i].type
        else
          c += "/" + extraChoice[key][i].type
      }
    }
    cars.carRequest[key] = c
    if(c != "")
      querys[key] = c
  })
  router.push({path: '/buy',query: querys})
}

const input_info = () =>{
  searchShow.value = false
}

const submit = (data : string) => {
  searchInfo.value = ''
  input_info()
  let info = data.split('-')
  brandSubmit(info[0])
  choose('carType', info[1])
}

const brandSubmit = (brand: string) => {
  let len = carsData.brands.length
  let i: number
  for (i = 0;i < len;i++){
    if(brand == carsData.brands[i]){
      choice.brand = brand;
      carsData.getCarTypes(choice.brand)
      choice.carType = '不限'
      return
    }
  }
  if(len > 19)
    carsData.brands.pop()
  carsData.brands.push(brand)
  choice.brand = brand;
  carsData.getCarTypes(choice.brand)
  choice.carType = '不限'
}

const extraSubmit = (type: string, choice : boolean[]) =>{
  let t = ''
  Object.keys(extraChoiceName).forEach(key => {
    if(extraChoiceName[key] == type)
      t = key
  });
  let i: number
  for (i = 0;i < choice.length; i++){
    extraChoice[t][i].choose = choice[i]
  }
}

const choose = (type : string, title: string) =>{
  if(type == "brand"){
    choice.brand = title;
    carsData.getCarTypes(choice.brand)
    choice.carType = '不限'
    cars.carRequest.search = ''
    searchInfo.value = searchStore.value  = ''
  }else if(type == "carType"){
    choice.carType = title;
    cars.carRequest.search = ''
    searchInfo.value = searchStore.value  = ''
  }else if(type == "price"){
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
    choose("brand","不限")
  }else if(n == 2){
    choose("brand",choice.brand)
  }
}

const cancel = (type : string) =>{
  choose(type, '不限')
}

const cancelExtra = (type : string) =>{
  const t = type.split('-')
  extraChoice[t[0]][parseInt(t[1])].choose = false
}

const clear = () => {
  Object.keys(choice).forEach(key => {
    choice[key] = '不限'
  });
  carsData.getCarTypes(choice.brand)
  startPrice.value = endPrice.value = ''
  Object.values(extraChoice).forEach(value => {
    let i: number
    for(i = 0;i < value.length;i++){
      value[i].choose = false
    }
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

const searchCertain = () => {
  clear()
  cars.carRequest.search = searchInfo.value
  searchStore.value = searchInfo.value
  show.value = false
  setTimeout(()=>{
    show.value = true
  },1)
  router.push({path: '/buy',query: {search: searchInfo.value}})
}

const searchCancel = () => {
  clear()
  cars.carRequest.search = searchInfo.value = searchStore.value = ''
  show.value = false
  setTimeout(()=>{
    show.value = true
  },1)
  router.push({path: '/buy'})
}

onMounted(()=>{
  clear()
  cars.carRequest.brand = '不限'
  cars.carRequest.carType = '不限'
  cars.carRequest.price = '不限'
  console.log(cars.carRequest)
  carsData.fetch()
  Object.keys(route.query).forEach(key => {
    if(key == 'carDetailType')
      extraChoice.carDetailType[1].choose = true
    else if(key == 'carLevel')
      extraChoice.carLevel[3].choose = true
    else if(key == 'carGear')
      extraChoice.carGear[1].choose = true
    else if(key == 'brand')
      brandSubmit(route.query[key])
    else if(key == 'search'){
      searchInfo.value = route.query[key]
      searchCertain()
    }
    else
      choose(key, route.query[key])
  });
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
      <div class="top_search_left" @click="searchShow = true">
        <input class="top_search_input" placeholder="二手车搜索" v-model="searchInfo" @input="input_info"/>
      </div>
      <div class="top_search_right" @click="searchCertain">
        <el-icon style="margin-left: 20%"><Search /></el-icon>
      </div>
      <CascaderChoose :left="0" :top="40" :is-show="searchShow" @disShow="searchShow = false" @submit="submit"/>
    </div>
  </div>

  <div class="filter-container">
    <div class="filter-brand">
      <div class="filter-title">品牌:</div>
      <div class="filter-main">
        <template v-for="brand in carsData.brands">
          <TypeChoice :title="brand" type="brand" :choice="choice.brand" @choose="choose"/>
        </template>
      </div>
      <WholeBrand @submit="brandSubmit"/>
    </div>
    <div class="filter-types">
      <div class="filter-title">车系:</div>
      <div class="filter-main">
        <template v-for="carType in carsData.carTypes">
          <TypeChoice :title="carType" type="carType" :choice="choice.carType" @choose="choose"/>
        </template>
      </div>
    </div>
    <div class="filter-prices">
      <div class="filter-title">价格:</div>
      <div class="filter-main">
        <template v-for="price in carsData.prices">
          <TypeChoice :title="price" type="price" :choice="choice.price" @choose="choose"/>
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
        <template v-for="(content, key) in extraChoice">
          <ExtraBox :choose="content" :type="extraChoiceName[key]" @submit="extraSubmit"/>
        </template>
      </div>
    </div>
  </div>
  <div class="search_container" v-if="searchStore!=''">
    <div class="search_container_text">
      您关注的&nbsp;&nbsp;“
      <span style="color: #db2828">{{searchStore}}</span>
      ”&nbsp;&nbsp;车有{{cars.carData.length}}辆
    </div>
    <div class="search_container_cancel">
      <el-icon style="margin-right: 20px; color: #dca89b;font-size: 20px;cursor: pointer" @click="searchCancel"><Close /></el-icon>
    </div>
  </div>

  <div class="filter-bottom">
    <div v-if="isShow" style="margin-right: 10px">已选: </div>
    <template v-for="(content, key) in choice">
      <ChooseBox :content=content :type="key" @cancel="cancel" v-if="content != '不限'"/>
    </template>
    <template v-for="(content, key) in extraChoice">
      <template v-for="(detail, index) in content">
        <ChooseBox :content=detail.type :type="key + '-' + index" @cancel="cancelExtra" v-if="extraChoice[key][index].choose"/>
      </template>
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
  position: relative;
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

.search_container{
  height: 42px;
  background: #fcf8e2;
  display: flex;
  align-items: center;
}

.search_container_text{
  margin-left: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
}

.search_container_cancel{
  flex: 1;
  display: flex;
  justify-content: right;
}
</style>