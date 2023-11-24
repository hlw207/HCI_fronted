<script setup lang="ts">

import {useWindowStore} from "~/stores/window";
import {StarFilled} from "@element-plus/icons-vue";
import {computed, ref} from "vue";
import {throttle} from "lodash";

const props = defineProps<{
  id: number,
  picturePath : string,
  name: string,
  price: number
  time : string,
  mileage: number,
  source: string
}>()

const windows = useWindowStore()
const position = ref()
const show = ref(false)
const date = computed(() =>{
  let d = props.time.split('/')
  return d[0] + '年' + d[1] + '月'
})
const firstPay = computed(() => (props.price / 4).toFixed(2))

const clickAt = () =>{
  window.removeEventListener('click',throttledHandle)

  show.value = false
}

const throttledHandle = throttle(clickAt, 100);
const showOut = () => {
  show.value = true
  setTimeout(() => {
    window.addEventListener('click',throttledHandle)
  }, 50);
}

const cancel_collection = () =>{
}

</script>

<template>
  <div class="collection">
    <div class="collection_container">
      <el-image :src="props.picturePath" class="collection_picture"></el-image>
      <el-icon class="collection_icon">
        <StarFilled @click="showOut"/>
        <div class="collection_cancel" v-if="show">
          <div class="collection_cancel_main" ref="position" @click="cancel_collection">取消收藏</div>
        </div>
      </el-icon>
    </div>
    <div class="collection_text">
      <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin: 10px 8px 0">
       <span>{{props.name}} 2021款 586E</span>
      </div>
      <div style="color: #9ba3af;font-size: 11px;margin: 5px 0 0 8px">
        {{date}} / {{props.mileage}}万公里 / {{props.source}}
      </div>
      <div style="display:flex;margin: 20px 0 3px 8px;position: relative">
        <span style="color: #fa5c3d;font-size: 20px">{{props.price}}万</span>
        <div style="margin: 10px 0 0 12px">
          <span style="font-size: 11px;color: #9ba3af;">首付{{firstPay}}万</span>
        </div>
        <div class="collection_button">免费咨询</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.collection{
  box-sizing: border-box;
  width: 23%;
  margin: 1% 1%;
  cursor: pointer;
  padding: 1px 1px 5px;
}

.collection:hover{
  border: 1px solid red;
}

.collection_container{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.collection_picture{
  width: 99.5%;
  transition: width 0.1s;
}

.collection_picture:hover{
  transform: scale(101%);
}

.collection_text{
  font-size: 13px;
  text-align: left;
}

.collection_button{
  position: absolute;
  right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  color: #fa5c3d;
  border: 1px solid #fa5c3d;
  padding: 5px 10px;
  margin-left: 18px;
}

.collection:hover .collection_button{
  background: #fa5c3d;
  color: white;
}

.collection_icon{
  position: absolute;
  color: #f0a03c;
  bottom: 5px;
  right: 10px;
  font-size: 25px;
  cursor: pointer;
}

.collection_cancel{
  z-index: 999;
  position: absolute;
  top: 35px;
  right: -5px;
  width: 70px;
  color: black;
  font-size: 13px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid rgba(161, 160, 160, 0.3);
}

.collection_cancel_main{
  margin: 1px 0;
  padding-top: 3px;
}

.collection_cancel_main:hover{
  color: #26aeea;
  background: rgba(128, 128, 128, 0.1);
}
</style>