<script setup lang="ts">
import {ref} from "vue";
import Newlist from "~/pages/home/components/newsBar/components/newlist.vue";

const media = ref(true)
const news = ref(false)
const news_info = ref([{title: '赛赛车亦庄店：4s店展厅高配，二手车交易新体验', link: 'https://new.qq.com/rain/a/20230817A05HWA00'}
                            ,{title: '赛赛车新发地店：单月成交超200辆，找我买车请放心！', link: 'https://new.qq.com/rain/a/20230817A05HWA00'}
                            ,{title: '探店赛赛车：走进北京亚市严选店', link: 'https://new.qq.com/rain/a/20230817A05HWA00'}
                            ,{title: '赛赛车五方店上新了！超百辆二手车急寻主人', link: 'https://new.qq.com/rain/a/20230817A05HWA00'}
                            ,{title: '赛赛车严选店全国总数突破100家 开启新一轮广告投放', link: 'https://new.qq.com/rain/a/20230817A05HWA00'}
                            ,{title: '赛赛车北京第三家严选店五方店盛大开业', link: 'https://new.qq.com/rain/a/20230817A05HWA00'}])
const medias_info = ref([{title: 'QuestMobile二手车电商数据解读：赛赛车行业领先', link: 'https://new.qq.com/rain/a/20230817A05HWA00'}
                            ,{title: '赛赛车完成D轮1.5亿美元融资 王思聪参投', link: 'https://new.qq.com/rain/a/20230817A05HWA00'}
                            ,{title: '赛赛车用户自述两次购车经历：赛赛车，靠谱！', link: 'https://new.qq.com/rain/a/20230817A05HWA00'}
                            ,{title: '赛赛车卷卷：没什么比善良更重要，产品也是', link: 'https://new.qq.com/rain/a/20230817A05HWA00'}
                            ,{title: '二手车电商大战，赛赛车获胜，凭什么？', link: 'https://new.qq.com/rain/a/20230817A05HWA00'}])
</script>

<template>
  <div class="news_bar">
    <div class="news_top">
      <div class="news_left">
        公司新闻
      </div>
      <div class="news_middle"></div>
      <div class="news_right" :class="{news_right_active : media}" @mouseenter="media=!media;news=!news">媒体报道</div>
      <div class="news_right" :class="{news_right_active : news}" @mouseenter="media=!media;news=!news">新闻中心</div>
    </div>
    <div class="news_main">
      <template v-for="medias_in in medias_info" v-if="media">
        <Newlist :title="medias_in.title" :link="medias_in.link" />
      </template>
      <template v-for="news_in in news_info" v-if="news">
        <Newlist :title="news_in.title" :link="news_in.link" />
      </template>
    </div>
    <div class="news_sep">
      <template v-for="index in 200">
        <div class="news_sep_grey"></div>
      </template>
    </div>
    <div class="news_bottom">
      <el-image class="news_picture" src="https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/news1.png"></el-image>
      <el-image class="news_picture" src="https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/news2.png"></el-image>
    </div>
  </div>
</template>

<style scoped>
.news_bar{
  box-sizing: border-box;
  margin-right: 32px;
  width: 100%;
  background: white;
  padding-top: 55px;
  padding-left: 90px;
}

.news_top{
  display: flex;
  align-items: center;
}

.news_left{
  font-size: 22px;
}

.news_middle{
  margin-left: 20px;
  width: 2px;
  height: 20px;
  background: rgba(0,0,0,.07);
}

.news_right{
  display: flex;
  align-items: center;
  padding: 11px 0 8px 0;
  margin-left: 32px;
  font-size: 16px;
  border-bottom: 3px solid white;
  cursor: pointer;
  color: #b8b6b8;
}

.news_right_active{
  border-bottom: 3px solid #ff6b23;
  color: #ff6b23;
  cursor: default;
}

.news_main{
  padding-top: 30px;
  display: flex;
  flex-wrap: wrap;
  letter-spacing: 0.3px;
}

.news_sep{
  display: flex;
  height: 1.2px;
  margin-right: 90px;
  overflow: hidden;
  flex-wrap: wrap;
}

.news_sep_grey{
  background: #dbdbdb;
  height: 1.2px;
  width: 4px;
  margin-right: 4px;
}

.news_bottom{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
}

.news_picture{
  cursor: pointer;
  margin-right: 30px;
  height: 35px;
}
</style>