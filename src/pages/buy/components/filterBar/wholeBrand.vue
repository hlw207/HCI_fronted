<script setup lang="ts">
import {ref} from "vue";
import {CaretBottom, CaretTop} from "@element-plus/icons-vue";
import {throttle} from "lodash";
import {useCarsData} from "~/stores/carsData";
import Index from "~/layouts/default.vue";
const emits = defineEmits(['submit'])

const isShow = ref(false)
const container = ref()
const carsData = useCarsData()

const top = ref()
const left = ref()
const bottom = ref()
const right = ref()

const show = ()=>{
  isShow.value = true
  setTimeout(()=>{
    top.value = Math.floor(container.value.getBoundingClientRect().top)
    left.value = Math.floor(container.value.getBoundingClientRect().left)
    bottom.value = Math.floor(container.value.getBoundingClientRect().bottom)
    right.value = Math.floor(container.value.getBoundingClientRect().right)
    window.addEventListener('mousemove', throttledHandle)
  },1)
}

const submit = (brand: string) => {
  emits('submit', brand)
  isShow.value = false
  window.removeEventListener('mousemove',throttledHandle)

}

const mouseHandle = (event : MouseEvent) => {
  const x = event.clientX
  const y = event.clientY
  if(!(y >= top.value && y <= bottom.value + 1 && x >= left.value && x <= right.value + 1)){
    isShow.value = false
    window.removeEventListener('mousemove',throttledHandle)
  }
}

const throttledHandle = throttle(mouseHandle, 100);
</script>

<template>
  <div class="extra_container" @mouseenter="show">
    <div>更多</div>
    <div class="extra_icon">
      <el-icon v-if="isShow"><CaretBottom /></el-icon>
      <el-icon v-if="!isShow"><CaretTop /></el-icon>
    </div>
  </div>
  <div class="extra_main" ref="container" v-if="isShow">
    <div class="extra_main_section">
      <template v-for="index in 8">
        <div class="brand_main" v-if="carsData.wholeBrands[index - 1].length != 0">
          <div class="brand_main_left">
            {{String.fromCharCode(index + 64)}}
          </div>
          <div class="brand_main_right">
            <template v-for="brand in carsData.wholeBrands[index - 1]">
              <div class="brand_text" @click="submit(brand)">
                {{brand}}
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
    <div class="extra_main_section">
      <template v-for="index in 9">
        <div class="brand_main" v-if="carsData.wholeBrands[8 + index - 1].length != 0">
          <div class="brand_main_left">
            {{String.fromCharCode(8 + index + 64)}}
          </div>
          <div class="brand_main_right">
            <template v-for="brand in carsData.wholeBrands[8 + index - 1]">
              <div class="brand_text" @click="submit(brand)">
                {{brand}}
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
    <div class="extra_main_section">
      <template v-for="index in 9">
        <div class="brand_main" v-if="carsData.wholeBrands[17 + index - 1].length != 0" style="margin-top: 10px">
          <div class="brand_main_left">
            {{String.fromCharCode(17 + index + 64)}}
          </div>
          <div class="brand_main_right">
            <template v-for="brand in carsData.wholeBrands[17 + index - 1]">
              <div class="brand_text" @click="submit(brand)">
                {{brand}}
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.extra_container{
  z-index: 800;
  right: 1px;
  position: absolute;
  display: flex;
  margin: 5px 0;
  padding: 3px 8px;
  color: black;
  font-size: 11px;
  cursor: pointer;
}

.extra_icon{
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  font-size: 12px;
}

.extra_container:hover{
  color: #fc844d;
}

.extra_main{
  z-index: 799;
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  background: white;
  border: 1px solid #fc844d;
}

.extra_main_section{
  width: 33.3%;
  padding: 20px 30px 30px 20px;
}

.brand_main{
  display: flex;
  margin-bottom: 15px;
}

.brand_main_left{
  display: flex;
  width: 8%;
  height: 20px;
  color: #f2711c;
  font-size: 14px;
  justify-content: center;
  padding-top: 5px;
  margin-right: 2%;
}

.brand_main:hover .brand_main_left{
  background: #f2711c;
  color: white;
}

.brand_main_right{
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  padding-top: 6px;
}

.brand_text{
  font-size: 10px;
  padding: 0 5px 5px 5px;
  cursor: pointer;
}

.brand_text:hover{
  color: #f2711c;
}
</style>