<template>
  <div class="searchBarContainer">
    <div class="searchInputBar">
      <el-popover
          placement="bottom"
          title="热门推荐"
          :width="600"
          trigger="hover"
          content="大众 本田 宝马 奥迪 别克 奔驰"
      >
        <template #reference>
          <el-input
              v-model="searchInput"
              placeholder="输入关键词，例如：本田"
              class="searchInput"
              @mouseenter="searchFocusIn"
              @mouseleave="searchFocusOut"
          >
          </el-input>
        </template>
      </el-popover>
      <el-button color="#eda01f" class="searchBtn" @click="search">
        <p style="color: white">查遍全网二手车</p>
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">

import {ref} from "vue";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";

const router = useRouter()
const searchInput = ref('')
const searchRecommend = ref(false)

const searchFocusIn = () => {
  searchRecommend.value = true
}

const searchFocusOut = () => {

}

const search = () => {
  if(searchInput.value == ''){
    ElMessage.warning("请输入您想看的车哦")
    return
  }
  router.push({path: '/buy',query: {search: searchInput.value}})
}

</script>



<style scoped lang="scss">
.searchBarContainer{
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024//home/searchBarBackground.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  overflow: clip;
}

.title{
  color: #eda01f;
}

.searchInputBar{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.searchInput{
  width: 600px;
  height: 50px;
  outline: none;
}

.searchBtn{
  margin-left: -135px;
  z-index: 5;
  height: 40px;
}

</style>
