<script setup lang="ts">
import { ref } from "vue";
import RedHeart from '../icon/redHeart.vue';
import GreyHeart from '../icon/greyHeart.vue';
import PinkHeart from '../icon/pinkHeart.vue';

const isLiked = ref(false);
const isCovered = ref(false);
const isClicked = ref(false);
const isFixed = ref(false);

const toggleLike = () => {
    isLiked.value = !isLiked.value;
    isClicked.value = true;
};

const mouseOver = () => {
    isCovered.value = true;
};

const mouseLeave = () => {
    isCovered.value = false;
    isClicked.value = false;
};

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 根据滚动距离判断是否应该固定
    isFixed.value = scrollTop > 55;
});
</script>

<template>
    <div :style="{ position: isFixed ? 'fixed' : 'absolute', top: isFixed ? '0' : '55px' }" class="searchAndBuy">
        <div class="searchContainer">
            <input type="text" class="searchInput" placeholder="搜索" />
            <button class="searchButton">🔍</button>
        </div>
        <button class="buyButton">购车</button>
        <button class="likeButton" :class="{ 'liked': isLiked }" @mouseover="mouseOver" @mouseleave="mouseLeave" @click="toggleLike">
            <RedHeart v-if="(!isCovered || (isCovered && isClicked))&& isLiked" />
            <PinkHeart v-if="isCovered && !isClicked" />
            <GreyHeart v-if="(!isCovered || (isCovered && isClicked)) && !isLiked" />
        </button>
    </div>
</template>

<style scoped>
.searchAndBuy {
    position: fixed;
    top: 55px;
    right: 30px;
    background-color: rgba(255, 125, 125, 0.00);
    display: flex;
    justify-content: space-between;
    z-index: 100;
}

.searchContainer {
    position: relative;
}

.searchInput {
    padding: 12px;
    padding-right: 35px;
    margin-top: 5px;
    margin-right: 50px;
    border: 1px solid #ccc; /* 添加边框样式 */
    border-radius: 50px; /* 设置边框圆角 */
    font-size: 18px;
}

.searchButton {
    position: absolute;
    top: 10%;
    right: 50px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 30px;
}

.buyButton {
    margin-right: 10px;
    margin-top: 5px;
    padding: 10px 20px;
    background-color: #ff8621;
    border: none;
    color: white;
    height: 50px;
    width: 100px;
    border-radius: 5px;
    font-size: 18px;
    cursor: pointer;
    /* 添加样式 */
    transition: background-color 0.3s ease; /* 添加过渡效果 */
}

.buyButton:hover {
    background-color: #ffb072; /* 鼠标悬停时的背景颜色 */
}

.likeButton {
    margin-right: 5px;
    border: none;
    background-color: rgba(255, 255, 255, 0);
    font-size: 50px;
    position: relative;
    cursor: pointer;
}

</style>