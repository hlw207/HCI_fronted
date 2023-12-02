<script setup lang="ts">
import { ref } from 'vue';

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

const parameterDetails = {
    '基本类型': [
        { name: '厂商', value: '广汽乘用车' },
        { name: '生产方式', value: '国产' },
        { name: '厂商指导价(万元)', value: '19.28' },
        { name: '上市时间', value: '2020.09' },
        { name: '能源形式', value: '汽油' },
        { name: '发动机', value: '2.0T 252马力 L4' },
        { name: '变速箱', value: '8挡自动' },
        { name: '工信部综合油耗(L/100km)', value: '8.3' },
        { name: '车身形式', value: '5门7座MPV' },
        { name: '整车质保(生产厂商)', value: '三年或10万公里' },
        // 添加更多基本类型的具体指标
    ],
    '发动机': [
        { name: '发动机型号', value: 'xxx' },
        { name: '进气形式', value: 'xxx' },
        // 添加更多发动机类型的具体指标
    ],
    '变速箱': [
        { name: '变速箱类型', value: '自动' },
        // 添加更多变速箱类型的具体指标
    ],
    // 添加更多参数类型的具体指标
};
</script>

<template>
    <div class="configDiv">
        <div class="carConfiguration">配置参数</div>

        <!-- 参数类型选择 -->
        <div class="parameterTypes">
            <label
                v-for="type in parameterTypes"
                :key="type"
                :class="{ 'parameterLabel-selected': selectedType === type }"
                class="parameterLabel"
            >
                <input
                    type="radio"
                    v-model="selectedType"
                    :value="type"
                    name="parameterType"
                    class="parameterRadio"
                />
                {{ type }}
            </label>
        </div>

        <!-- 具体指标名称和数值 -->
        <div class="parameterDetails">
            <div v-for="detail in parameterDetails[selectedType]" :key="detail.name" class="detailItem">
                <div class="detailPair">
                    <div class="detailName">{{ detail.name }}：</div>
                    <div class="detailValue">{{ detail.value }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.configDiv {
    margin: 20px 347px 20px 65px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.carConfiguration {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.parameterTypes {
    margin-left: 45px;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
}

.parameterLabel {
    font-size: 16px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    transition: background-color 0.3s;
    flex-basis: calc(15%);
    margin: 5px;
}

.parameterRadio {
    margin-right: -5px;
    appearance: none;
}

.parameterLabel-selected {
    background-color: #ffd3c0;
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
