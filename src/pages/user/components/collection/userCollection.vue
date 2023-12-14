<script setup lang="ts">

import {StarFilled} from "@element-plus/icons-vue";
import {computed, ref} from "vue";
import {throttle} from "lodash";
import {useRouter} from "vue-router";
import {request} from "~/utils/request";
import {useUserStore} from "~/stores/user";
import {ElMessage} from "element-plus";
import {useCollectionStore} from "~/stores/collection";

const props = defineProps<{
  id: number,
  picturePath : string,
  name: string,
  price: number
  time : string,
  mileage: number,
  source: string
}>()

const collection = useCollectionStore()
const router = useRouter()
const position = ref()
const show = ref(false)
const date = computed(() =>{
  let d = props.time.split('/')
  return d[0] + '年' + d[1] + '月'
})
const firstPay = computed(() => (props.price / 4).toFixed(2))
const popShow = ref(false)

const click = (event) => {
  if(event.target.className != "collection_button" && event.target.className != 'collection_cancel_main' && event.target.tagName !="path" && event.target.tagName !="I"&& event.target.tagName !="svg"){
    router.push("/detail/" + props.id)
  }
}
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
  request({
    url: '/cars/collection',
    method: 'DELETE',
    params: {
      userId: useUserStore().id,
      carId: props.id
    }
  }).then((res)=>{
    collection.fetch(collection.page)
  })
  ElMessage.success("取消关注")
}

</script>

<template>
  <div class="collection" @click="click">
    <div class="collection_container">
      <div class="collection_picture">
          <el-image :src="props.picturePath" class="collection_picture_main"></el-image>
      </div>
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
        <span style="color: #fa5c3d;font-size: 20px">{{props.price.toFixed(2)}}万</span>
        <div style="margin: 10px 0 0 12px">
          <span style="font-size: 11px;color: #9ba3af;">首付{{firstPay}}万</span>
        </div>
        <div class="collection_button" @click="popShow=true">免费咨询</div>
      </div>
    </div>
  </div>
  <PopUp :title="name" :show="popShow" :price="props.price" :path="props.picturePath" @cancel="popShow=false"/>
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
  overflow: hidden;
  width: 100%;
}

.collection_picture_main{
  width: 100%;
  transition: all 0.5s;
}

.collection_picture_main:hover{
  transform: scale(110%);
  transition: all 0.5s;
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
  padding: 10px;
  position: absolute;
  z-index: 100;
  color: #f0a03c;
  bottom: 3px;
  right: 0;
  font-size: 25px;
  cursor: pointer;
}

.collection_cancel{
  z-index: 900;
  position: absolute;
  top: 46px;
  right: 0px;
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