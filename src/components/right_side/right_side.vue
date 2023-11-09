<template>
  <div class="sideBar">
    <SideBarItem icon="Message" text="售前资讯"/>
    <SideBarItem icon="Message" text="售后服务"/>
    <SideBarItem icon="ChatDotRound" text="公众号"/>
    <SideBarItem icon="Iphone" text="下载App"/>
    <div v-if="backToTop" class="backToTop" @click="handleBackToTop">
      <el-icon>
        <ArrowUp />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {ArrowUp, Message} from "@element-plus/icons-vue";
import SideBarItem from "~/components/right_side/components/item/index.vue"


const backToTop = ref(false)

onMounted(() => {
  window.addEventListener("scroll", handleScroll)
})

const handleScroll = () => {
    backToTop.value = window.scrollY > 0
}

const handleBackToTop = () => {
  window.scrollTo({
    top:0
  })
}
</script>

<style scoped>

.sideBar{
  width: 100px;
  min-height: 200px;
  position: fixed;
  border: 1px solid #eda01f;
  border-radius: 5px;
  right: 10px;
  bottom: 30px;
}

.backToTop{
  width: 100%;
  height: 25px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #eda01f;
}

.backToTop:hover{
  color: white;
  background-color: #eda01f;
}


</style>
