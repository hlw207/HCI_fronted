<script setup lang="ts">
import ImageModal from "~/pages/detail/components/image/imageModal.vue";
import {ref} from "vue";
import {PICTURE_ADDR} from "~/config";

const ImageModalRef = ref()
const exteriorImages = [
     PICTURE_ADDR + '/car1.jpg',
     PICTURE_ADDR + '/car2.jpg',
     PICTURE_ADDR + '/car1.jpg',
     PICTURE_ADDR + '/car2.jpg',
     PICTURE_ADDR + '/car1.jpg',
     PICTURE_ADDR + '/car2.jpg',
     PICTURE_ADDR + '/car1.jpg',
     PICTURE_ADDR + '/car2.jpg',
     PICTURE_ADDR + '/car1.jpg',
     PICTURE_ADDR + '/car2.jpg',
    // ...
];

const interiorImages = [
     PICTURE_ADDR + '/car3.jpg',
     PICTURE_ADDR + '/car4.jpg',
     PICTURE_ADDR + '/car3.jpg',
     PICTURE_ADDR + '/car4.jpg',
     PICTURE_ADDR + '/car3.jpg',
     PICTURE_ADDR + '/car4.jpg',
     PICTURE_ADDR + '/car3.jpg',
     PICTURE_ADDR + '/car4.jpg',
     PICTURE_ADDR + '/car3.jpg',
     PICTURE_ADDR + '/car4.jpg',
    // ...
];

const engineImages = [
     PICTURE_ADDR + '/car5.jpg',
     PICTURE_ADDR + '/car6.jpg',
     PICTURE_ADDR + '/car5.jpg',
     PICTURE_ADDR + '/car6.jpg',
     PICTURE_ADDR + '/car5.jpg',
     PICTURE_ADDR + '/car6.jpg',
     PICTURE_ADDR + '/car5.jpg',
     PICTURE_ADDR + '/car6.jpg',
     PICTURE_ADDR + '/car5.jpg',
     PICTURE_ADDR + '/car6.jpg',
    // ...
];

const openPicture = (url) =>{
    ImageModalRef.value.openModal(url)
};
</script>

<template>
    <div class="pictureDiv">
        <div class="pictureSection">
            <h2>车辆外观</h2>
            <div v-for="(image, index) in exteriorImages" :key="index" class="imageItem" @click="openPicture(image)">
                <img :src="image" alt="Exterior Image" />
            </div>

            <template>
                <ImageModal ref="ImageModalRef"/>
            </template>
            <ImageModal ref="ImageModalRef"/>

        </div>

        <div class="pictureSection">
            <h2>车辆内饰</h2>
            <div v-for="(image, index) in interiorImages" :key="index" class="imageItem" @click="openPicture(image)">
                <img :src="image" alt="Interior Image" />
            </div>

            <template>
                <ImageModal ref="ImageModalRef"/>
            </template>
            <ImageModal ref="ImageModalRef"/>

        </div>

        <div class="pictureSection">
            <h2>发动机底盘</h2>
            <div v-for="(image, index) in engineImages" :key="index" class="imageItem" @click="openPicture(image)">
                <img :src="image" alt="Engine Image" />
            </div>

            <template>
                <ImageModal ref="ImageModalRef"/>
            </template>
            <ImageModal ref="ImageModalRef"/>

        </div>
    </div>
</template>


<style scoped>
.pictureDiv {
    margin: 35px 347px 35px 65px;
    display: flex;
    flex-direction: column;
}

.pictureSection {
    display: flex;
    flex-wrap: wrap;
    width: 96%;
    padding: 20px;
    background-color: white;
    border: 1px solid #ddd; /* 更浅的边框颜色 */
    border-radius: 8px;
    margin-bottom: 25px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */
}

.pictureSection h2 {
    font-size: 18px;
    margin-bottom: 20px;
    width: 100%;
    color: #333; /* 更深的标题颜色 */
}

.imageItem {
    cursor: pointer;
    width: 32.1%;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 10px;
}

.imageItem img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 6px; /* 圆角 */
}
</style>
