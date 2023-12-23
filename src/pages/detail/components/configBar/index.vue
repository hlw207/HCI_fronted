<script setup lang="ts">
import { ref } from 'vue';
import DetailInfo from "~/pages/detail/components/configBar/components/detailInfo.vue";

const selectedType = ref('基本类型'); // 默认选择基本类型

const parameterTypes = [
    '基本类型',
    '发动机',
    '变速箱',
    '车身结构',
    '底盘转向',
    '安全配置',
    '辅助操控配置',
    '外部配置',
    '内部配置',
    '座椅配置',
    '多媒体配置',
    '灯光配置',
    '玻璃/后视镜',
    '空调/冰箱',
];

</script>

<template>
    <div class="configDiv">
        <div class="carConfiguration">配置参数</div>

        <!-- 参数类型选择 -->
        <div class="parameterTypes">
          <template v-for="type in parameterTypes">
            <div class="parameterLabel" :class="{'parameterLabel-selected': selectedType == type }" @click="selectedType=type">
              {{type}}
            </div>
          </template>
        </div>
        <!-- 具体指标名称和数值 -->
        <DetailInfo :info="selectedType"/>
    </div>

    <div class="picDiv">
      <el-image style="width: 105%" src="../../../public/pictures/bottom.png"></el-image>
    </div>
</template>

<style scoped>
.configDiv {
    margin: 20px 152px 20px 120px;
    padding: 20px;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.05);
}

.picDiv{
  margin: 25px 152px 65px 120px;
}

.carConfiguration {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}

.parameterTypes {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
    margin-left: 10px;
    margin-right: 10px;
}

.parameterLabel {
    box-sizing: border-box;
    margin: 6px 10px;
    padding: 8px 0;
    width: 12%;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transition: background-color 0.3s;
    background: white;
    border: 1px solid rgba(0, 0, 0, 0.10);
}

.parameterLabel-selected {
    background-color: #ff6b23;
    color: white;
}

.parameterDetails {
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
}

.detailItem {
    display: flex;
    margin: 5px;
    margin-left: 30px;
    flex-basis: calc(45%);
}

.detailPair {
    display: flex;
    flex-wrap: wrap;
}

.detailName {
    color: #555;
    border: 1px solid #ccc;
    padding: 5px;
    width: 250px;
}

.detailValue {
    font-weight: bold;
    color: #333;
    border: 1px solid #ccc;
    padding: 5px;
    width: 130px;
}
</style>
