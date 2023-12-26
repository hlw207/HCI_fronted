<script setup lang="ts">
import ImageModal from "~/pages/detail/components/image/imageModal.vue";
import {ref} from "vue";
import {PICTURE_ADDR} from "~/config";
import {useCarDetailData} from "~/stores/carDetailData";

const carDetail = useCarDetailData()
// const exteriorImages = [
//      PICTURE_ADDR + '/car1.jpg',
//      PICTURE_ADDR + '/car2.jpg',
//      PICTURE_ADDR + '/car1.jpg',
//      PICTURE_ADDR + '/car2.jpg',
//      PICTURE_ADDR + '/car1.jpg',
//      PICTURE_ADDR + '/car2.jpg',
//      PICTURE_ADDR + '/car1.jpg',
//      PICTURE_ADDR + '/car2.jpg',
//      PICTURE_ADDR + '/car1.jpg',
//      PICTURE_ADDR + '/car2.jpg',
//     // ...
// ];
//
// const interiorImages = [
//      PICTURE_ADDR + '/car3.jpg',
//      PICTURE_ADDR + '/car4.jpg',
//      PICTURE_ADDR + '/car3.jpg',
//      PICTURE_ADDR + '/car4.jpg',
//      PICTURE_ADDR + '/car3.jpg',
//      PICTURE_ADDR + '/car4.jpg',
//      PICTURE_ADDR + '/car3.jpg',
//      PICTURE_ADDR + '/car4.jpg',
//      PICTURE_ADDR + '/car3.jpg',
//      PICTURE_ADDR + '/car4.jpg',
//     // ...
// ];
//
// const engineImages = [
//      PICTURE_ADDR + '/car5.jpg',
//      PICTURE_ADDR + '/car6.jpg',
//      PICTURE_ADDR + '/car5.jpg',
//      PICTURE_ADDR + '/car6.jpg',
//      PICTURE_ADDR + '/car5.jpg',
//      PICTURE_ADDR + '/car6.jpg',
//      PICTURE_ADDR + '/car5.jpg',
//      PICTURE_ADDR + '/car6.jpg',
//      PICTURE_ADDR + '/car5.jpg',
//      PICTURE_ADDR + '/car6.jpg',
//     // ...
// ];

const openPicture = (index: number) =>{
  carDetail.index = index
};
</script>

<template>
    <div class="pictureDiv">
        <div class="pictureSection">
            <h2>车辆外观</h2>
            <div v-for="(image, index) in carDetail.surface" :key="index" class="imageItem" @click="openPicture(index)">
                <img :src="image" alt="Exterior Image" />
            </div>

        </div>

        <div class="pictureSection">
            <h2>车辆内饰</h2>
            <div v-for="(image, index) in carDetail.trim" :key="index" class="imageItem" @click="openPicture(index + 8)">
                <img :src="image" alt="Interior Image" />
            </div>

        </div>

        <div class="pictureSection">
            <h2>发动机底盘</h2>
            <div v-for="(image, index) in carDetail.engine" :key="index" class="imageItem" @click="openPicture(index + 16)">
                <img :src="image" alt="Engine Image" />
            </div>

        </div>
    </div>
</template>


<style scoped>
.pictureDiv {
    margin: 35px 355px 35px 120px;
    display: flex;
    flex-direction: column;
}

.pictureSection {
    display: flex;
    flex-wrap: wrap;
    width: 96%;
    padding: 20px;
    background-color: white;
    margin-bottom: 25px;
    box-shadow: 0 2px 10px 0 rgba(0,0,0,.05);
}

.pictureSection h2 {
    font-size: 18px;
    margin-bottom: 20px;
    width: 100%;
    color: #333; /* 更深的标题颜色 */
}

.imageItem {
    cursor: pointer;
    width: 31.333%;
    margin: 0 1%;
    margin-bottom: 10px;
}

.imageItem img {
    width: 100%;
    height: auto;
    object-fit: cover;
}
</style>
