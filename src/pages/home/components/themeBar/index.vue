<template>
  <el-carousel :interval="4000" type="card"  height="300px" style="width: 1200px;margin-top: 20px">
    <el-carousel-item v-for="item in themes" :key="item">
      <div class="themeItem">
        <div class="linearBg">

        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts">

const themes = [
  {
    name: '上班族首选',
    title: '通勤代步',
    img: '/pictures/theme-performance.jpg',
    marks: [],
  },
  {
    name: '中产家庭之选',
    title: '家有萌宝',
    img: '',
    marks: [],
  },
  {
    name: '品质提升必备',
    title: '撩妹必备',
    img: '',
    marks: [],
  },
  {
    name: '外出旅行最爱',
    title: '翻山越岭',
    img: '',
    marks: [],
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.themeItemTitle{
  width: 100%;
  height: 50%;
}

.linearBg{
  background-image: linear-gradient(90deg,transparent,#fff), url('/pictures/theme-performance.jpg');  // #fff表示需要兼容的底色
  width: 200px;
  height: 200px;
  background-size: 40%, contain;	// 40%表达需要渐变的宽度
  background-repeat: no-repeat;
  background-position: right;  // right表示渐变对齐的方向
}

</style>
