<template>
    <div class="reportDiv">
        <div class="carReport">车辆检测报告</div>

        <!-- 项目列表 -->
        <div class="projectList">
            <div v-for="(project, index) in projects" :key="index" class="projectItem">
                <div class="circleContainer">
                    <div class="circle" :style="{ backgroundColor: project.color }"></div>
                    <p class="projectName">{{ project.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const projects = [
    { name: '重大事故排查', color: 'green' },
    { name: '轻微碰撞排查', color: 'green' },
    { name: '易损易耗部件', color: 'green' },
    { name: '功能部件检测', color: 'green' },
    { name: '外观内饰检测', color: 'yellow' },
    { name: '启动检测', color: 'red' },
    // 添加更多项目...
];
</script>

<style scoped>
.reportDiv {
    margin: 20px 295px 20px 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */
}

.carReport {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.projectList {
    display: flex;
    flex-wrap: wrap;
}

.projectItem {
    width: 44%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin: 5px 10px 10px 20px;
}

.circleContainer {
    display: flex;
    align-items: center;
}

.circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
}

.projectName {
    font-size: 18px;
    text-align: center;
    margin: 0;
}
</style>
