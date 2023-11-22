<template>
    <div className="heart"></div>
</template>

<style scoped>
.heart {
    width: 30px; /* 修改宽度 */
    height: 30px; /* 修改高度 */
    background-color: palevioletred;
    position: relative;
    transform: rotate(-45deg);
    margin: 15px; /* 修改边距 */
}

.heart:before,
.heart:after {
    content: '';
    width: 30px; /* 修改宽度 */
    height: 30px; /* 修改高度 */
    background-color: palevioletred;
    border-radius: 50%;
    position: absolute;
}

.heart:before {
    top: -15px; /* 修改位置 */
    left: 0;
}

.heart:after {
    top: 0;
    left: 15px; /* 修改位置 */
}
</style>
<script setup>
</script>