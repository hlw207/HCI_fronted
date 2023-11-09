<template>
  <el-collapse v-model="activeName" accordion class="filter">
    <el-collapse-item title="品牌" name="1">
      <div class="marks">
        <div v-for="(mark,index) in marks" class="singleMark">
          <img :src="mark.url" style="width: 24px;height: 24px">
          <span style="margin-left: 10px;font-size: 20px">{{mark.name}}</span>
        </div>
        <div class="singleMark" @click="drawer = true">
          <span style="font-size: 15px;margin-left: 20px">所有品牌</span>
          <el-icon >
            <ArrowRight />
          </el-icon>
        </div>
      </div>
    </el-collapse-item>
    <el-collapse-item title="选你所爱" name="2" style="font-size: 25px">
      <div>
        Operation feedback: enable the users to clearly perceive their
        operations by style updates and interactive effects;
      </div>
      <div>
        Visual feedback: reflect current state by updating or rearranging
        elements of the page.
      </div>
    </el-collapse-item>

  </el-collapse>

  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <span>Hi there!</span>
  </el-drawer>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {ArrowRight} from "@element-plus/icons-vue";

const activeName = ref('1')
const drawer = ref(false)
const marks = [
  {
    name: '大众',
    url:'https://image1.guazistatic.com/files/brand/1207.png',
  },
  {
    name: '宝马',
    url:'https://image1.guazistatic.com/files/brand/1198.png',
  },
  {
    name: '奥迪',
    url:'https://image1.guazistatic.com/files/brand/1199.png',
  },
  {
    name: '本田',
    url:'https://image1.guazistatic.com/files/brand/1196.png',
  },
  {
    name: '别克',
    url:'https://image1.guazistatic.com/files/brand/1206.png',
  },
  {
    name: '奔驰',
    url:'https://image1.guazistatic.com/files/brand/1197.png',
  }
]
</script>

<style scoped>
.filter{
  width: 90%;
  margin-top: 20px;
}
.marks{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.singleMark{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
}

.singleMark:hover{
  color: #eda01f;
}
</style>
