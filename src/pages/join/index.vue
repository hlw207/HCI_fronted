<template>
<div class="joinBackGround">
  <div class="joinContainer">
    <div class="joinRowContainer" style="height: 570px">
      <el-image src="/public/pictures/join/joinImg01.jpg" style="height: 100%;flex: 1"/>
    </div>
    <div class="joinRowContainer">
      <div class="joinImgContainer">
        <el-image src="/public/pictures/join/joinIcon01.png" class="joinImg"/>
      </div>
      <IntroduceBar title="品牌赋能" content="店面升级改造方案，获客能力显著提升，品牌授权，顾客认可度高，增加品怕溢价收入" style="flex: 1"/>
    </div>
    <div class="joinRowContainer">
      <IntroduceBar title="流量赋能" content="百万客户资源，搭建零售新场景，专业电销团队加持" style="flex: 1"/>
      <div class="joinImgContainer">
        <el-image src="/public/pictures/join/joinIcon02.png" class="joinImg"/>
      </div>
    </div>
    <div class="joinRowContainer">
      <div class="joinImgContainer">
        <el-image src="/public/pictures/join/joinIcon03.png" class="joinImg"/>
      </div>
      <IntroduceBar title="系统赋能" content="全流程线上化作业系统--AI智能定价系统--智能CRM系统三大助力" style="flex: 1"/>
    </div>
    <div class="joinRowContainer">
      <IntroduceBar title="生态赋能" content="多样金融方案支持，交易流程服务标准化，完整售后体系" style="flex: 1"/>
      <div class="joinImgContainer">
        <el-image src="/public/pictures/join/joinIcon04.png" class="joinImg"/>
      </div>
    </div>
    <div class="joinRowContainer">
      <IntroduceBar title="管理赋能" content="强大经营分析系统，权威行业专家培训" style="flex: 1"/>
      <div class="joinImgContainer">
        <el-image src="/public/pictures/join/joinIcon05.png" class="joinImg"/>
      </div>
    </div>
    <div class="joinInstruction">
      <h1 style="color: #f2711c;border-bottom:4px solid #f2711c;">合伙人加盟产品介绍</h1>
      <div style="width: 40%">
        <h2 style="color: #f2711c">加盟方式</h2>
          <p class="joinInstructionPara">1. 电话或者线上报名后，在线招商经理会联系您</p>
          <p class="joinInstructionPara">2. 店面装修及服务流程达标</p>
          <p class="joinInstructionPara">3. 成功加入”品牌合伙人/流量合伙人“</p>
        <h2 style="color: #f2711c">收费标准</h2>
          <p class="joinInstructionPara">加盟保证金：1万元起（依城市规模等级而定）</p>
          <p class="joinInstructionPara">现在加盟立享实时优惠，详询在线招商经理</p>
      </div>
      <el-image src="/public/pictures/join/joinImg02.png" style="width: 200px"/>
      <h1 style="color: #f2711c;border-bottom:4px solid #f2711c;">加盟答疑区</h1>
      <Question title="成为品牌合伙人有什么条件？" content="有门店的二手车经营者，对现有门店结合人人车品牌进行改造，满足品牌和服务标准要求"/>
      <Question title="成为品牌合伙人后我需要做什么" content="在开展合伙人业务过程中，您需要为车主提供上门评估车辆服务。为买卖双方提供带看、撮合交易等服务"/>
    </div>
  </div>
  <PhoneInputBar />
</div>

</template>

<script setup lang="ts">
import IntroduceBar from './components/introduceBar/index.vue'
import PhoneInputBar from './components/phoneInputBar/index.vue'
import Question from './components/question/index.vue'

</script>

<style scoped>
.joinBackGround{
  margin-right: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
}
.joinContainer{
  width: 80%;
  background-color: white;
  padding-top: 30px;
}
.joinRowContainer{
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
}

.joinIcon{
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.joinImgContainer{
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.joinImg{
  width: 200px;
  height: 200px;
}

.joinInstruction{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.joinInstructionPara{
  text-indent: 2em;
  color: #a6a6a6;
}
</style>
