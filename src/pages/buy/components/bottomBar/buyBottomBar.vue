<script setup lang="ts">

import {onMounted, ref, watch} from "vue";
import {useBuyBottomStore} from "~/stores/buyBottomStore";


const carsBuy = useBuyBottomStore()
const maxPage = ref()
const real_page = ref()
const page = ref()
const old_page = ref()

watch(page,(()=>{
    if(page.value < 1 || page.value > maxPage.value){
        page.value = old_page.value
    }else {
        old_page.value = page.value
    }
}))

watch(()=>carsBuy.total_num,(()=>{
    maxPage.value = carsBuy.total_num == 0 ? 1 : Math.floor((carsBuy.total_num - 1) / 32) + 1
}))

watch(carsBuy.carRequest,(()=>{
  carsBuy.fetch(0)
  real_page.value = page.value = old_page.value = 1
}))

const certain = () => {
    if(real_page.value != page.value) {
        real_page.value = old_page.value = page.value
        carsBuy.fetch(real_page.value - 1)
        document.documentElement.scrollTop = 0
    }
}

const changePage = (p : number) => {
    carsBuy.fetch(p)
    real_page.value = old_page.value = page.value = p + 1
    document.documentElement.scrollTop = 0
}

onMounted(()=>{
    carsBuy.fetch(carsBuy.page)
    setTimeout(()=>{
      page.value = carsBuy.page + 1
      real_page.value = old_page.value = page.value
      maxPage.value = Math.floor(carsBuy.total_num / 32) + 1
    }, 100)
})
</script>

<template>
    <div class="car_bottom">
        <div class="car_bottom_main">
            <div class="car_bottom_page" style="padding-top: 6px" v-if="real_page != 1" @click="changePage(real_page - 2)">上一页</div>
            <div class="car_bottom_page" v-if="1 < real_page - 1" @click="changePage(0)">1</div>
            <div style="margin-top: 12px;margin-left: 3px;margin-right: 3px" v-if="1 < real_page - 2">...</div>
            <div class="car_bottom_page" v-if="real_page >= 2" @click="changePage(real_page - 2)">{{real_page - 1}}</div>
            <div class="car_bottom_page car_bottom_page_active">{{real_page}}</div>
            <div class="car_bottom_page" v-if="real_page + 1 <= maxPage" @click="changePage(real_page)">{{real_page + 1}}</div>
            <div style="margin-top: 12px;margin-left: 3px;margin-right: 3px" v-if="maxPage > real_page + 2">...</div>
            <div class="car_bottom_page" v-if="maxPage > real_page + 1" @click="changePage(maxPage - 1)">{{maxPage}}</div>
            <div class="car_bottom_page" style="padding-top: 6px" v-if="real_page != maxPage" @click="changePage(real_page)">下一页</div>
            <div class="car_bottom_text">
                共 {{maxPage}} 页，跳至
            </div>
            <input class="car_bottom_input" type="number" min="1" :max="maxPage" v-model="page">
            <div class="car_bottom_text">
                页
            </div>
            <div class="car_bottom_button" @click="certain">
                确定
            </div>
        </div>
    </div>
</template>

<style scoped>
.car_bottom{
    display: flex;
    justify-content:center;
    align-items:center;
    margin-top: 30px;
    padding-bottom: 35px;
}

.car_bottom_main{
    display: flex;
}

.car_bottom_page{
    box-sizing: border-box;
    height: 30px;
    margin: 0 3px;
    padding-top: 8px;
    padding-left: 11px;
    padding-right: 11px;
    border-radius: 5px;
    border: 1px solid rgba(128, 128, 128, 0.4);
    text-align: center;
    font-size: 12px;
    cursor: pointer;
}

.car_bottom_page:hover{
    border: 1px solid #fa5c3d;
    color: #fa5c3d;
}

.car_bottom_page_active{
    background: #fa5c3d;
    color: white;
}

.car_bottom_page_active:hover{
    border: 1px solid rgba(128, 128, 128, 0.4);
    color: white;
}

.car_bottom_input{
    box-shadow:none;
    outline: none;
    margin-top: 6px;
    width: 45px;
    border: 1px solid #9ba3af;
    color: #9ba3af;
    font-size: 12px;
    border-radius: 3px;
    margin-left: 12px;
}

.car_bottom_input:focus{
    border: 1px solid #fa5c3d;
}

.car_bottom_text{
    margin-top: 10px;
    margin-left: 10px;
    font-size: 11px;
    color: #9ba3af;
}

.car_bottom_button{
    margin-top: 5px;
    margin-left: 10px;
    font-size: 12px;
    background: #fa5c3d;
    color: white;
    border: 1px solid grey;
    padding-top: 3px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 4px;
    cursor: pointer;
}
</style>
