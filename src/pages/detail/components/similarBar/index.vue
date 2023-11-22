<template>
    <div class="similarDiv" :style="{ top: similarDivTop }">
        <div class="similarTitle">猜你喜欢</div>
        <div v-for="car in cars" :key="car.id" class="carItem">
            <img :src="car.image" alt="Car Image" class="carImage" />
            <p class="carName">{{ car.name }}</p>
            <p class="carPrice">{{ car.price }} 万</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const cars = ref([
    { id: 1, name: '车辆名称 1', price: 5, image: '../../../../public/pictures/car1.jpg' },
    { id: 2, name: '车辆名称 2', price: 6, image: '../../../../public/pictures/car1.jpg' },
    { id: 3, name: '车辆名称 3', price: 5, image: '../../../../public/pictures/car1.jpg' },
    { id: 4, name: '车辆名称 4', price: 6, image: '../../../../public/pictures/car1.jpg' },
    { id: 5, name: '车辆名称 5', price: 5, image: '../../../../public/pictures/car1.jpg' },
    { id: 6, name: '车辆名称 6', price: 6, image: '../../../../public/pictures/car1.jpg' },
    { id: 7, name: '车辆名称 7', price: 5, image: '../../../../public/pictures/car1.jpg' },
    { id: 8, name: '车辆名称 8', price: 6, image: '../../../../public/pictures/car1.jpg' },

]);

const similarDivTop = ref('580px');

const updateSimilarDivPosition = () => {
    const scrollTop = document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const similarDiv = document.querySelector('.similarDiv');
    const similarDivHeight = similarDiv.clientHeight;
    if (similarDiv) {
        if(scrollTop > 580 + similarDivHeight - viewportHeight){
            similarDivTop.value = scrollTop - similarDivHeight + viewportHeight + "px";
        }else{
            similarDivTop.value = 580 + "px";
        }
    }
};

onMounted(() => {
    window.addEventListener('scroll', updateSimilarDivPosition);
});

onUnmounted(() => {
    window.removeEventListener('scroll', updateSimilarDivPosition);
});
</script>

<style scoped>
.similarDiv {
    position: absolute;
    background-color: #e0e0e0;
    right: 35px;
    width: 250px;
    display: flex;
    flex-direction: column;
}

.similarTitle {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    background-color: #808080;
    color: white;
}

.carItem {
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    background-color: white;
    border: 1px solid #ccc;
    margin-bottom: 5px;
}

.carImage {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.carName {
    font-size: 14px;
    margin-top: 10px;
    height: 5px;
    color: #333;
}

.carPrice {
    font-size: 18px;
    color: #ff8621;
    height: 5px;
}
</style>
