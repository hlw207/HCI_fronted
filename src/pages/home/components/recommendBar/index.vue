<script setup lang="ts">

import {ref} from "vue";
import {ArrowRight} from "@element-plus/icons-vue";
import CarShowCollection from "~/pages/home/components/recommendBar/components/carShowCollection.vue";
import {useRouter} from "vue-router";
const router = useRouter()
const recommend = ref([{title: '超值好车', choose: true}
                            ,{title: '5万以下超值车', choose: false}
                            ,{title: '5-10万超值车', choose: false}
                            ,{title: '超值SUV', choose: false}
                            ,{title: '急售降价车', choose: false}])

const choose = (index: number) => {
  let i: number
  for (i = 0;i < 5;i++)
    recommend.value[i].choose = false
  recommend.value[index].choose = true
}

const router_to = () =>{
  router.push('/buy')
}
</script>

<template>
  <div class="recommend_bar">
    <div class="recommend_up">
      <div class="recommend_up_left">好车推荐</div>
      <div class="recommend_up_sep"></div>
      <template v-for="(re,index) in recommend">
        <div class="recommend_up_right" :class="{recommend_up_right_active: re.choose}" @mouseenter="choose(index)">{{re.title}}</div>
      </template>
      <div class="recommend_up_extra" @click="router_to">
        更多
        <div class="circle">
          <el-icon style="font-size: 14px"><ArrowRight /></el-icon>
        </div>
      </div>
    </div>
    <div class="recommend_main">
      <template v-for="index in 8">
        <CarShowCollection :id="1" image="https://img2.rrcimg.com/o_1hcmjhcm43647735031172183876915061.jpg?imageView2/2/interlace/1/w/290/h/192/format/webp" color="白色" :price="13" name="无敌这下" time="2022/12/11" source="北京" :mileage="20.31" />
      </template>
    </div>
    <div class="recommend_bottom" @click="router_to">
      <div class="recommend_button">查看更多</div>
    </div>
  </div>
</template>

<style scoped>
.recommend_bar{
  background: #f8f8f8;
  margin: 30px 32px 20px 0;
  padding: 25px 5%;
}

.recommend_up{
  padding: 0 0.5%;
  position: relative;
  display: flex;
  align-items: center;
}

.recommend_up_left{
  color: rgba(0,0,0,.8);
  margin-right: 20px;
  font-size: 22px;
}

.recommend_up_sep{
  background: rgba(0,0,0,.07);
  margin-top: 5px;
  height: 20px;
  width: 2px;
}

.recommend_up_right{
  margin-left: 30px;
  font-size: 16px;
  color: rgba(0,0,0,.6);
  padding: 8px 0;
  border-top: 3px solid transparent;
  border-bottom: 3px solid transparent;
  cursor: pointer;
}

.recommend_up_right_active{
  color: #ff6b23;
  border-bottom: 3px solid #ff6b23;
}

.recommend_up_extra{
  position: absolute;
  right: 0;
  color: rgba(0,0,0,.36);
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.recommend_up_extra:hover{
  color: #ff6b23;
}

.recommend_up_extra:hover .circle{
  border: 1.2px solid #ff6b23;
}

.circle{
  margin-left: 4px;
  margin-top: 1px;
  height: 15px;
  width: 15px;
  border-radius: 8px;
  border: 1.2px solid rgba(0,0,0,.36);
  display: flex;
  align-items: center;
  justify-content: center;
}

.recommend_main{
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
}

.recommend_bottom{
  display: flex;
  justify-content: center;
}

.recommend_button{
  margin-top: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 170px;
  height: 46px;
  border: 1px solid rgba(0,0,0,.17);
  border-radius: 4px;
  color: rgba(0,0,0,.36);
  background: 0 0;
  font-size: 16px;
  box-sizing: border-box;
  cursor: pointer;
}

.recommend_button:hover{
  color: #ff6b23;
  border: 1px solid #ff6b23;
}
</style>