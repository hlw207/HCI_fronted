<script setup lang="ts">
import {useCarDetailData} from "~/stores/carDetailData";
import {onMounted, ref} from "vue";
import {ArrowLeftBold, ArrowRightBold, CopyDocument} from "@element-plus/icons-vue";

const detail = useCarDetailData()
const show = ref()

const top = ref()
const left = ref()
const bottom = ref()
const right = ref()

const canClick = ref(true)
const margin_left = ref(-780)
const time = ref(0.5)

const mouseHandle = (event: MouseEvent) =>{
  const x = event.clientX
  const y = event.clientY
  if(!(x >= left.value && x <= right.value && y >= top.value && y <= bottom.value)){
    detail.index = -1
    window.removeEventListener('click', mouseHandle)
  }
}

const arrowRight = () =>{
  if(canClick.value) {
    canClick.value = false
    margin_left.value = -780 * 2
    setTimeout(() => {
      detail.index = detail.index + 1 >= detail.total ? 0 : detail.index + 1
      margin_left.value = -780
      time.value = 0
      setTimeout(() => {
        time.value = 0.5
        canClick.value = true
      }, 10)
    }, 300)
  }
}

const arrowLeft = () =>{
  if(canClick.value) {
    canClick.value = false
    margin_left.value = 0
    setTimeout(() => {
      detail.index = detail.index - 1 < 0 ? detail.total - 1: detail.index - 1
      margin_left.value = -780
      time.value = 0
      setTimeout(() => {
        time.value = 0.5
        canClick.value = true
      }, 10)
    }, 300)
  }
}

onMounted(()=>{
  setTimeout(()=>{
    top.value = Math.floor(show.value.getBoundingClientRect().top)
    left.value = Math.floor(show.value.getBoundingClientRect().left)
    bottom.value = Math.floor(show.value.getBoundingClientRect().bottom)
    right.value = Math.floor(show.value.getBoundingClientRect().right)
    window.addEventListener('click', mouseHandle)
  },1)
})
</script>

<template>
  <div class="mask">
  </div>
  <div class="down">
    <div class="show" ref="show">
      <div class="show_left">
        <div class="show_left_main">
          <template v-for="index in 3">
            <img class="show_picture" :src="detail.getPicture((detail.index + index - 2 + detail.total) % detail.total)" alt="" onselectstart ='return false'/>
          </template>
        </div>
        <div class="show_left_down">
          <el-icon style="font-size: 14px"><CopyDocument /></el-icon>
          <div style="margin: 0 6px;font-size: 14px">{{detail.index + 1}}/{{detail.total}}</div>
        </div>
        <div class="show_arrow" style="left: 0">
          <el-icon class="arrow" @click="arrowLeft"><ArrowLeftBold /></el-icon>
        </div>
        <div class="show_arrow" style="right: 0">
          <el-icon class="arrow" @click="arrowRight"><ArrowRightBold /></el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mask {
  z-index: 998;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000;
  opacity: 0.5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.down{
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.show{
  display: flex;
  width: 1050px;
  height: 500px;
  background: white;
  opacity: 1;
}

.show_left{
  display: flex;
  position: relative;
  width: 780px;
  background: #f2711c;
  overflow: hidden;
}

.show_left_main{
  margin-left: v-bind(margin_left + 'px');
  display: flex;
  transition: all v-bind(time + 's');
}

.show_picture{
  flex-shrink:0;
  width: 780px;
  height: 500px;
}

.show_left_down{
  position: absolute;
  bottom: 0;
  left: 0;
  height: 32px;
  width: 100%;
  display: flex;
  justify-content: right;
  color: white;
  align-items: center;
}

.show_arrow{
  position: absolute;
  top: 0;
  width: 80px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow{
  font-size: 40px;
  cursor: pointer;
  color: white;
}

.arrow:hover{
  color: #fc0e11;
}

.show_right{

}
</style>