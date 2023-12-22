<script setup lang="ts">
import {mask} from "~/utils/interfaces";
import {PropType} from "vue";
import {useRouter} from "vue-router";

const props = defineProps({
  name: String,
  title: String,
  picture: String,
  marks: [] as PropType<mask[]>
})

const rouetr = useRouter()
const router_to = () =>{
  if(props.title == '通勤代步'){
    rouetr.push({path: '/buy', query: {'price': '5-15万'}})
  }else if(props.title == '家有萌宝'){
    rouetr.push({path: '/buy', query: {'price': '15-30万'}})
  }else if(props.title == '撩妹必备'){
    rouetr.push({path: '/buy', query: {'price': '30万以上'}})
  }
}

const router_brand = (index: number) =>{
  rouetr.push({path: '/buy', query: {'brand': props.marks[index].brand, carType: props.marks[index].carType}})
}
</script>

<template>
  <div class="theme_collection">
    <div class="theme_top">{{props.name}}</div>
    <div class="theme_main">
      <div class="theme_picture"  @click="router_to">
        <el-image class="theme_p" :src="props.picture"></el-image>
        <div class="theme_text">{{props.title}}</div>
        <div class="theme_extra">查看更多</div>
      </div>
      <div class="theme_main_b">
        <div class="theme_main_block" style="margin-bottom: 0.5px">
          <div class="theme_box theme1" @click="router_brand(0)">
            <div class="theme_text1">{{props.marks[0].name}}</div>
            <div class="theme_text2">{{props.marks[0].description}}</div>
          </div>
          <div class="theme_box" @click="router_brand(1)">
            <div class="theme_text1">{{props.marks[1].name}}</div>
            <div class="theme_text2">{{props.marks[1].description}}</div>
          </div>
        </div>
        <div class="theme_main_block">
          <div class="theme_box theme1" @click="router_brand(2)">
            <div class="theme_text1">{{props.marks[2].name}}</div>
            <div class="theme_text2">{{props.marks[2].description}}</div>
          </div>
          <div class="theme_box" @click="router_brand(3)">
            <div class="theme_text1">{{props.marks[3].name}}</div>
            <div class="theme_text2">{{props.marks[3].description}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.theme_collection{
  flex: 1;
  margin: 0 8px;
}

.theme_top{
  color: rgba(0,0,0,.8);
  font-size: 22px;
}

.theme_main{
  margin-top: 28px;
  width: 100%;
  height: 400px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.05);
}

.theme_picture{
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  height: 139px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
}

.theme_picture:hover .theme_p{
  transform: scale(110%);
}

.theme_picture:hover .theme_extra{
  color: rgba(0,0,0,.6);
  border: 1px solid rgba(0,0,0,.6);
}

.theme_p{
  width: 100%;
  transition: all 0.5s;
}

.theme_text{
  position: absolute;
  top: 47px;
  left: 39px;
  font-size: 24px;
  color: #5b5d71;
}

.theme_extra{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 85px;
  left: 39px;
  width: 112px;
  height: 23px;
  margin-top: 10px;
  font-size: 12px;
  border: 1px solid rgba(0,0,0,.17);
  color: rgba(0,0,0,.36);
}

.theme_main_b{
  height: 263px;
  background: #efefef;
}

.theme_main_block{
  height: 131px;
  display: flex;
  flex-wrap: wrap;
}

.theme_box{
  height: 131.25px;
  width: 49.87%;
  background: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.theme1{
  margin-right: 0.5px;
}

.theme_box:hover .theme_text1{
  font-size: 18px;
}

.theme_box:hover .theme_text2{
  font-size: 18px;
}

.theme_text1{
  color: rgba(0,0,0,.6);
  font-size: 16px;
  transition: all 0.3s;
}

.theme_text1:hover{
  color: #f2711c;
}

.theme_text2{
  font-size: 16px;
  color: #414e74;
  transition: all 0.3s;
}
</style>