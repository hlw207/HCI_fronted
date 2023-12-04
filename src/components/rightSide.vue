<script setup lang="ts">
import {useWindowStore} from "~/stores/window";
import {ChatDotRound, Download, Edit, PhoneFilled, Top} from "@element-plus/icons-vue";
import {onMounted, reactive, ref} from "vue";

const windows = useWindowStore()
const height = windows.height

const appear = reactive({
  download: false,
  wechat: false,
  suggest: false,
  suggest_page : false,
  phone: false,
  top: false
})

const isAtTop = ref(true);

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});

const handleScroll = () => {
    isAtTop.value = window.scrollY === 0;
};

const scrollToTop = () => {
    if (isAtTop.value) return;
    appear.top = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <div class="fixed_right">
    <div class="icon_container" @mouseenter="appear.download = true" @mouseleave="appear.download = false">
      <el-icon class="icon"><Download /></el-icon>
    </div>
    <div class="icon_container" @mouseenter="appear.wechat = true" @mouseleave="appear.wechat = false">
      <el-icon class="icon"><ChatDotRound /></el-icon>
    </div>
    <div class="icon_container" @mouseenter="appear.suggest = true" @mouseleave="appear.suggest = false" @click="appear.suggest_page = true">
      <el-icon class="icon"><Edit /></el-icon>
    </div>
    <div class="icon_container" @mouseenter="appear.phone = true" @mouseleave="appear.phone = false">
      <el-icon class="icon"><PhoneFilled /></el-icon>
    </div>
      <div v-if="!isAtTop" class="icon_top" @mouseenter="appear.top = true" @mouseleave="appear.top = false" @click="scrollToTop">
          <el-icon class="icon"><Top /></el-icon>
          <p class="top_word">top</p>
      </div>
  </div>
  <div v-if="appear.download" class="download">
    <div>
      <el-image src="../../public/pictures/download.png">
      </el-image>
    </div>
    <span>下载APP</span>
  </div>
  <div v-if="appear.wechat" class="wechat">
    <div>
      <el-image src="../../public/pictures/wechat.jpg">
      </el-image>
    </div>
    <span>下载APP</span>
  </div>
  <div v-if="appear.suggest" class="suggest">
    <p style="font-size: 12px">意见反馈</p>
  </div>
  <div v-if="appear.phone" class="phone">
    <p style="font-size: 12px">免费咨询: 15971989001</p>
  </div>
    <div v-if="appear.top" class="top">
        <p style="font-size: 12px">回到顶部</p>
    </div>
  <el-dialog v-model="appear.suggest_page"></el-dialog>
</template>

<style scoped>
.fixed_right{
  z-index: 999;
  position: fixed;
  right: 2px;
  top: 0;
  height: v-bind( height + 'px');;
  width: 30px;
  background: #2a2c37;
  padding-top: v-bind(height / 3.6 + 'px');
}
.icon_container{
  color: #a4a5aa;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-left: 5px;
  margin-bottom: 8px;
}
.icon_top{
    color: #a4a5aa;
    padding-top: 240px;
    padding-bottom: 3px;
    padding-left: 5px;
}
.top_word{
    color: #a4a5aa;
    font-size: 12px;
    padding-left: 3px;
    margin-top: 0;
}
.icon_container:hover{
  color: aliceblue;
  padding-left: 5px;
  background: rgba(255,255,255,0.1);
}
.icon{
  font-size: 20px;
  opacity: 100%;
}
.download{
  z-index: 1;
  position: fixed;
  right: 40px;
  top: v-bind(height / 5 + 'px');
  background: white;
  height: 120px;
  width: 120px;
  padding: 10px;
  border-radius: 5px;
  border:4px solid whitesmoke;
  text-align: center;
  font-size: 12px;
}
.download div{
  padding-left: 4px;
  padding-right: 4px;
}
.wechat{
  z-index: 1;
  position: fixed;
  right: 40px;
  top: v-bind(height / 4 + 'px');
  background: white;
  height: 120px;
  width: 120px;
  padding: 10px;
  border-radius: 5px;
  border:4px solid whitesmoke;
  text-align: center;
  font-size: 12px;
}
.wechat div{
  padding-left: 4px;
  padding-right: 4px;
}
.suggest{
  z-index: 1;
  position: fixed;
  right: 40px;
  top: v-bind(height / 2.7 + 'px');
  width: 100px;
  border-radius: 5px;
  border:4px solid whitesmoke;
  text-align: center;
  background: white;
}
.phone{
  z-index: 1;
  position: fixed;
  right: 40px;
  top: v-bind(height / 2.3 + 'px');
  width: 220px;
  border-radius: 5px;
  border:4px solid whitesmoke;
  text-align: center;
  background: white;
}
.top{
    z-index: 1;
    position: fixed;
    right: 40px;
    top: v-bind(height / 1.15 + 'px');
    width: 100px;
    border-radius: 5px;
    border:4px solid whitesmoke;
    text-align: center;
    background: white;
}
</style>