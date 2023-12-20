<script setup lang="ts">

import BuyInfo from "~/pages/home/components/buyBar/components/buyInfo.vue";
import {ref} from "vue";
const infos = ref([{path: 'https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/buy1.jpg', person: '李女士', car: '昂克赛拉', price: 8.20, content: '人人车平台在买车前有初检，过户有复检，对外观、发动机等会进行专业详细的检查，可以排除事故车，水泡车，火烧车，而且之后还有一年两万公里的质保，这让我作为一个小白也敢大胆买二手车了。'}
                       ,{path: 'https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/buy3.jpg', person: '意先生', car: '马自达6', price: 7.26, content: '因为有了娃所以想换一辆B级车，当我看到这台马自达6时，当即感觉就是它！复检时发现这辆车可能调过表，人人车的工作人员帮我核实了4S店保养记录，最终安心入手，真的很给力！'}
                       ,{path: 'https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/buy2.jpg', person: '叶先生', car: '马自达5', price: 7.60, content: '我感觉已经中了二手车的「毒」，以后很难再买新车，换过这么多辆，每辆都开1-2年，其实跟买新车没有区别。多抽点时间在人人车上看车源，经常会有又便宜又好的车，看准了就要尽快约看（我就因为犹豫错过了好几辆）。'}])
</script>

<template>
  <div class="buy_bar">
    <div class="buy_top">
      <el-image style="height: 45px" src="https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/buy.png"></el-image>
    </div>
    <div class="buy_main">
      <template v-for="info in infos">
        <BuyInfo :path="info.path" :price="info.price" :car="info.car" :person="info.person" :content="info.content"/>
      </template>
    </div>
  </div>
</template>

<style scoped>
.buy_bar{
  margin-right: 32px;
  width: 76%;
  padding: 50px 12%;
  margin-bottom: 10px;
}

.buy_top{
  display: flex;
  align-items: center;
  justify-content: center;
}

.buy_main{
  margin-top: 40px;
  display: flex;
  height: 350px;
}
</style>