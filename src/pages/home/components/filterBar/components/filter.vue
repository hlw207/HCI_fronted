<template>
  <el-collapse v-model="activeName" accordion class="filter">
    <el-collapse-item title="品牌" name="1">
      <div class="marks">
        <div v-for="(mark,index) in marks" class="singleMark" @click="routerTo('brand', mark.name)">
          <img :src="mark.url" style="width: 24px;height: 24px">
          <span style="margin-left: 10px;font-size: 20px">{{mark.name}}</span>
        </div>
        <div class="singleMark" @click="drawer = true">
          <div style="font-size: 14px;margin-left: 20px;width: 28px;margin-right: 10px">
            所有品牌
          </div>
          <el-icon >
            <ArrowRight />
          </el-icon>
        </div>
      </div>
    </el-collapse-item>
    <el-collapse-item title="选你所爱" name="2" style="font-size: 25px">
      <el-row class="row-bg" justify="space-evenly" style="margin-bottom: 20px">
        <el-col class="filterCol" :span="6" @click="routerTo('price','0-4万')">4万以下</el-col>
        <el-col class="filterCol" :span="6" @click="routerTo('price','4-8万')">4-8万</el-col>
        <el-col class="filterCol" :span="6" @click="routerTo('price','8-15万')">8-15万</el-col>
        <el-col class="filterCol" :span="6" @click="router.push('/buy')">更多价位</el-col>
      </el-row>
      <el-row class="row-bg" justify="space-evenly">
        <el-col class="filterCol" :span="6">入门练手</el-col>
        <el-col class="filterCol" :span="6">自家SUV</el-col>
        <el-col class="filterCol" :span="6">商务7座</el-col>
        <el-col class="filterCol" :span="6" @click="router.push('/buy')">更多车源</el-col>
      </el-row>
    </el-collapse-item>

  </el-collapse>

  <el-drawer v-model="drawer" title="I am the title" :with-header="false">
    <el-col v-for="i in 26">
      <div class="drawerRow">
        {{ String.fromCharCode(65 + i - 1) }}
      </div>
      <el-row :gutter="20" style="margin-bottom: 10px" justify="start">
        <div v-for="item in carBrands" style="display: flex;flex-direction: row;">
          <div v-if="String.fromCharCode(65 + i - 1) === item.headLetter" class="drawerColumn">
            {{item.name}}
          </div>
        </div>
      </el-row>
    </el-col>
  </el-drawer>
</template>


<script setup lang="ts" >
import {ref} from "vue";
import {ArrowRight} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";

const activeName = ref('1')
const drawer = ref(false)
const router = useRouter()

const marks = [
  {
    name: '大众',
    url:'https://image1.guazistatic.com/files/brand/1207.png',
    headLetter: 'D'
  },
  {
    name: '宝马',
    url:'https://image1.guazistatic.com/files/brand/1198.png',
    headLetter: 'B'
  },
  {
    name: '奥迪',
    url:'https://image1.guazistatic.com/files/brand/1199.png',
    headLetter: 'A'
  },
  {
    name: '本田',
    url:'https://image1.guazistatic.com/files/brand/1196.png',
    headLetter: 'B'
  },
  {
    name: '别克',
    url:'https://image1.guazistatic.com/files/brand/1206.png',
    headLetter: 'B'
  },
  {
    name: '奔驰',
    url:'https://image1.guazistatic.com/files/brand/1197.png',
    headLetter: 'B'
  }
]

const carBrands = [
  {name: '奥迪', headLetter: 'A'},
  {name: '埃安', headLetter: 'A'},
  {name: 'AITO', headLetter: 'A'},
  {name: '阿尔法·罗密欧', headLetter: 'A'},
  {name: '阿尔法·罗密欧', headLetter: 'A'},
  {name: '阿尔法·罗密欧', headLetter: 'A'},
  {name: 'ARCFOX极狐', headLetter: 'A'},
  {name: '本田', headLetter: 'B'},
  {name: '宝马', headLetter: 'B'},
  {name: '奔驰', headLetter: 'B'},
  {name: '别克', headLetter: 'B'},
  {name: '比亚迪', headLetter: 'B'},
];

const routerTo = (type: string, value: string) =>{
    const query = {}
    query[type] = value
    router.push({path: '/buy', query: query})
}

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


.filterCol{
  cursor: pointer;
}

.filterCol:hover{
  color: #eda01f;
}

.drawerRow{
  color: #eda01f;
  min-height: 50px;
  margin-bottom: -10px;
}

.drawerColumn{
  font-size: 15px;
  white-space: nowrap;
  cursor: pointer;
  margin: 10px;
}

.drawerColumn:hover{
  color: #eda01f;
}

</style>
