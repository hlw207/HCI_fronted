<script setup lang="ts">

import {useWindowStore} from "~/stores/window";
import {StarFilled} from "@element-plus/icons-vue";
import {ref} from "vue";
import {throttle} from "lodash";

const props = defineProps<{
  id: number,
  picturePath : string,
  name: string,
  price: number
}>()

const windows = useWindowStore()
const width = windows.width - windows.width * 2 / 11 - 32 - 200
const height = width * 0.6
const position = ref()
const show = ref(false)

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
    <el-image :src="props.picturePath" class="collection_picture"></el-image>
    <div class="collection_text">
      <span>品牌：{{props.name}}&nbsp;&nbsp;&nbsp</span>
      <span>价格：{{props.price}}万</span>
      <el-icon class="collection_icon">
        <StarFilled @click="showOut"/>
        <div class="collection_cancel" v-if="show">
          <div class="collection_cancel_main" ref="position" @click="cancel_collection">取消收藏</div>
        </div>
      </el-icon>
    </div>
  </div>
</template>

<style scoped>
.collection{
  width: v-bind(width / 4 + 'px');
  margin: 10px 20px;
}

.collection_picture{
  width: v-bind(width / 4 + 'px');
  height: v-bind(height / 4 + 'px');
}

.collection_text{
  display: flex;
  font-size: 14px;
  text-align: left;
  margin-left: 5px;
}

.collection_icon{
  color: #f0a03c;
  margin-left: 15px;
  font-size: 18px;
  cursor: pointer;
}

.collection_cancel{
  position: absolute;
  top: 25px;
  left: 5px;
  width: 70px;
  color: black;
  font-size: 13px;
  text-align: center;
  border-radius: 5px;
  border: 1px solid rgba(161, 160, 160, 0.3);
}

.collection_cancel_main{
  margin-top: 3px;
  padding-top: 3px;
}

.collection_cancel_main:hover{
  color: #26aeea;
  background: rgba(128, 128, 128, 0.1);
}
</style>