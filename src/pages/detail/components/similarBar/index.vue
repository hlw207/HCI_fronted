<template>
    <div class="similarDiv" :style="{ top: similarDivTop }">
        <div class="similarTitle">猜你喜欢</div>
        <div v-for="car in cars" :key="car.id" class="carItem" @click="choose(car.id)">
            <img :src="car.image" alt="Car Image" class="carImage" />
            <p class="carName">{{ car.name }}</p>
            <p class="carPrice">{{ car.price.toFixed(2) }} 万</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {PICTURE_ADDR} from "~/config";
import {useRouter} from "vue-router";
const router = useRouter()

const cars = ref([
    { id: 121, name: '丰田-雷凌', price: 6.00, image:  PICTURE_ADDR + 'car/' + '121.jpg'},
    { id: 138, name: '福特-翼虎', price: 6.38, image:  PICTURE_ADDR + 'car/' + '138.jpg' },
    { id: 137, name: '宝马-宝马2系', price: 9.30, image:  PICTURE_ADDR + 'car/' + '137.jpg' },
    { id: 135, name: '领克-领克01', price: 9.80, image:  PICTURE_ADDR + 'car/' + '135.jpg' },
    { id: 133, name: '奔驰-奔驰A级', price: 13.68, image:  PICTURE_ADDR + 'car/' + '133.jpg' },
    { id: 52, name: '保时捷-Macan', price: 35.50, image:  PICTURE_ADDR + 'car/' + '52.jpg' },
]);

const similarDivTop = ref('1270px');

const updateSimilarDivPosition = () => {
    const scrollTop = document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const similarDiv = document.querySelector('.similarDiv');
    const similarDivHeight = similarDiv.clientHeight;
    if (similarDiv) {
        if(scrollTop > 1540 + similarDivHeight - viewportHeight){
            similarDivTop.value = 1540 + "px";
        }else if(scrollTop > 1270 + similarDivHeight - viewportHeight){
            similarDivTop.value = scrollTop - similarDivHeight + viewportHeight + "px";
        }
        else{
            similarDivTop.value = 1270 + "px";
        }
    }
};
const choose = (index: number) =>{
  document.documentElement.scrollTop = 0
  router.push('/detail/' + index)
}

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
    background-color: #efefef;
    right: 32px;
    width: 250px;
    display: flex;
    flex-direction: column;
}

.similarTitle {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    background-color: #ff6b23;
    color: white;
}

.carItem {
    margin-left: 10px;
    margin-right: 10px;
    padding: 10px;
    background-color: white;
    border: 1px solid #ccc;
    margin-bottom: 5px;
    cursor: pointer;
}

.carItem:hover{
  border: 1px solid #ff6b23;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,.05);
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
    color: #ff5317;
    height: 5px;
}
</style>
