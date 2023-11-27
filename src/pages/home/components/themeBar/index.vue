<template>
  <el-carousel :interval="4000" type="card" style="width: 1200px;margin-top: 30px;height: 350px;margin-right: 32px">
    <el-carousel-item v-for="item in themes" :key="item">
      <div class="themeItem">
        <div class="themeItemTitle">
          <el-text class="themeItemTitleName" tag="b">{{ item.name }}</el-text>
          <el-text class="themeItemTitleTitle" tag="b">
            <el-icon>
              <Bell />
            </el-icon>
            {{ item.title }}
          </el-text>
        </div>
        <div class="themeItemClassification">
          <el-row v-for="line in 2" style="width: 100%;height: 50%">
            <div class="themeItemClassificationMark">
              <el-text tag="b">{{item.marks[line - 1].name}}</el-text>
              <el-text style="color: #eda01f" tag="b">{{item.marks[0].description}}</el-text>
            </div>
            <div class="themeItemClassificationMark">
              <el-text tag="b">{{item.marks[line].name}}</el-text>
              <el-text style="color: #eda01f" tag="b">{{item.marks[1].description}}</el-text>
            </div>
          </el-row>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">

import {Bell} from "@element-plus/icons-vue";

const themes = [
  {
    name: '上班族首选',
    title: '通勤代步',
    marks: [
      {
        name: '速腾',
        description: '空间充裕'
      },
      {
        name: '轩逸',
        description: '节能典范'
      },
      {
        name: '高尔夫',
        description: '外型时尚'
      },
      {
        name: '卡罗拉',
        description: '操纵灵活'
      },
    ],
  },
  {
    name: '中产家庭之选',
    title: '家有萌宝',
    marks: [
      {
        name: '速腾',
        description: '空间充裕'
      },
      {
        name: '轩逸',
        description: '节能典范'
      },
      {
        name: '高尔夫',
        description: '外型时尚'
      },
      {
        name: '卡罗拉',
        description: '操纵灵活'
      },
    ],
  },
  {
    name: '品质提升必备',
    title: '撩妹必备',
    marks: [
      {
        name: '速腾',
        description: '空间充裕'
      },
      {
        name: '轩逸',
        description: '节能典范'
      },
      {
        name: '高尔夫',
        description: '外型时尚'
      },
      {
        name: '卡罗拉',
        description: '操纵灵活'
      },
    ],
  },
  {
    name: '外出旅行最爱',
    title: '翻山越岭',
    marks: [
      {
        name: '速腾',
        description: '空间充裕'
      },
      {
        name: '轩逸',
        description: '节能典范'
      },
      {
        name: '高尔夫',
        description: '外型时尚'
      },
      {
        name: '卡罗拉',
        description: '操纵灵活'
      },
    ],
  }
]

</script>


<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.themeItem{
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to left, transparent 5%, white), url('/pictures/home/theme.jpg');
  background-size: cover;
  transition: 0.6s;
}


.themeItem:hover{
  transform: scale(1.05);
}

.themeItemTitle{
  width: 100%;
  height: 50%;
}

.themeItemClassification{
  width: 100%;
  height: 50%;
}

.themeItemTitleName{
  position: relative;
  top: 10%;
  left: 6%;
  font-size: 25px;
  color: #eda01f;
}

.themeItemTitleTitle{
  position: relative;
  left: -10%;
  top: 35%;
  font-size: 20px;
  color: rgba(237, 160, 31, 0.8);
}

.themeItemClassificationMark{
  width: 30%;
  height: 100%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: -20px;
}

.themeItemClassificationMark:hover{
  background-color: rgba(117, 117, 117, 0.2)
}


</style>
