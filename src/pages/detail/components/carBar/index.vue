<script setup lang="ts">
import {ref, onMounted, computed} from 'vue';
import ImageModal from '~/pages/detail/components/image/imageModal.vue';
import {Star, StarFilled} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {useCarsData} from "~/stores/carsData";
import {useUserStore} from "~/stores/user";

const ImageModalRef = ref()

const pictures = [
    '../../../../public/pictures/car1.jpg',
    '../../../../public/pictures/car2.jpg',
    '../../../../public/pictures/car3.jpg',
    '../../../../public/pictures/car4.jpg',
    '../../../../public/pictures/car5.jpg',
    '../../../../public/pictures/car6.jpg',
    '../../../../public/pictures/car1.jpg',
    '../../../../public/pictures/car2.jpg',
    '../../../../public/pictures/car3.jpg',
    '../../../../public/pictures/car4.jpg',
    '../../../../public/pictures/car5.jpg',
    '../../../../public/pictures/car6.jpg',
];

const currentPictureIndex = ref(0);
const thumbnailContainer = ref(null);
const thumbnailWidth = ref(130); // 设置缩略图的宽度
const isLeftArrowHovered = ref(false);
const isRightArrowHovered = ref(false);
const shine = ref('false')

const nextPicture = () => {
    currentPictureIndex.value = (currentPictureIndex.value + 1) % pictures.length;
    scrollToSelectedThumbnail();
};

const prevPicture = () => {
    currentPictureIndex.value = (currentPictureIndex.value - 1 + pictures.length) % pictures.length;
    scrollToSelectedThumbnail();
};

const openPicture = () =>{
    ImageModalRef.value.openModal(pictures[currentPictureIndex.value])
};

const scrollToSelectedThumbnail = () => {
    if (thumbnailContainer.value) {
        const maxScrollLeft = thumbnailContainer.value.scrollWidth - thumbnailContainer.value.clientWidth;

        if (currentPictureIndex.value === pictures.length - 1) {
            // 当滑动到最后一张图片时，滚动到最右侧
            thumbnailContainer.value.scrollLeft = maxScrollLeft;
        } else {
            // 否则滚动到选中的图片位置
            const scrollLeft = currentPictureIndex.value * thumbnailWidth.value - (thumbnailContainer.value.clientWidth / 2 - thumbnailWidth.value / 2);
            thumbnailContainer.value.scrollLeft = Math.max(0, scrollLeft);


        }
    }
};

const handleArrowHover = (hovered, direction) => {
    if (direction === 'left') {
        isLeftArrowHovered.value = hovered;
    } else if (direction === 'right') {
        isRightArrowHovered.value = hovered;
    }
};

const clickStar = () => {
  ElMessage.success("成功关注")
  shine.value = true
}

const cancelStar = () => {
  ElMessage.success("取消关注")
  shine.value = false
}

const leftArrowImage = computed(() => isLeftArrowHovered.value ? '../../../../public/pictures/arrow-left-over.jpg' : '../../../../public/pictures/arrow-left.jpg');
const rightArrowImage = computed(() => isRightArrowHovered.value ? '../../../../public/pictures/arrow-right-over.jpg' : '../../../../public/pictures/arrow-right.jpg');


onMounted(() => {
    scrollToSelectedThumbnail();
});
</script>

<template>

    <div>
        <div class="carDiv">
            <!-- 车辆图片 -->
            <div class="carPicture">
                <div class="wholePicture">
                    <!-- 左箭头 -->
                    <div
                        class="arrowContainerLeft"
                        @click="prevPicture"
                        @mouseover="handleArrowHover(true, 'left')"
                        @mouseout="handleArrowHover(false, 'left')"
                    >
                        <el-image
                            :src="leftArrowImage"
                            alt="向左箭头"
                        />
                    </div>


                    <div class="imageContainer" @click="openPicture">
                        <transition name="fade" mode="out-in">
                            <el-image :key="currentPictureIndex" :src="pictures[currentPictureIndex]" alt="当前图片" />
                        </transition>
                        <div class="imageOverlay">
                            {{ currentPictureIndex + 1 }} / {{ pictures.length }}
                        </div>
                    </div>

                    <template>
                        <ImageModal ref="ImageModalRef"/>
                    </template>
                    <ImageModal ref="ImageModalRef"/>


                    <!-- 右箭头 -->
                    <div
                        class="arrowContainerRight"
                        @click="nextPicture"
                        @mouseover="handleArrowHover(true, 'right')"
                        @mouseout="handleArrowHover(false, 'right')"
                    >
                        <el-image
                            :src="rightArrowImage"
                            alt="向右箭头"
                        />
                    </div>
                </div>

                <!-- 小图滑动部分 -->
                <div class="thumbnailContainer" ref="thumbnailContainer">
                    <div class="thumbnails">
                        <div
                            v-for="(picture, index) in pictures"
                            :key="index"
                            class="thumbnail"
                            :class="{ 'selected': index === currentPictureIndex }"
                            @click="currentPictureIndex = index"
                        >
                            <img :src="picture" alt="缩略图" />
                        </div>
                    </div>
                </div>
            </div>


            <!-- 车辆信息 -->
            <div class="carInfo">
                <!-- 1. 车辆名称 -->
                <div class="carName">
                  车辆名称
                  <el-icon class="collection_icon" v-if="useUserStore().id != -1">
                    <StarFilled class="show" v-if="shine" @click="cancelStar"/>
                    <StarFilled style="color: #9ba3af;" v-if="!shine" @click="clickStar"><Star /></StarFilled>
                  </el-icon>
                </div>

                <!-- 2. 车辆价格 -->
                <div class="carPrice">
                    <span class="totalPrice">XXX万</span>
                    <span class="downPayment">首付: YYY万</span>
                </div>

                <!-- 3. 详细信息 -->
                <div class="carDetails">
                    <!-- 六个小容器，可以根据需要添加内容 -->
                    <div class="detailRow">
                        <div class="detailContainer">
                            <span class="value">XXX</span>
                            <span class="category">表显里程</span>
                        </div>
                        <div class="detailContainer">
                            <span class="value">XXX</span>
                            <span class="category">上牌时间</span>
                        </div>
                        <div class="detailContainer">
                            <span class="value">XXX</span>
                            <span class="category">车辆所在地</span>
                        </div>
                    </div>

                    <div class="detailRow">
                        <div class="detailContainer">
                            <span class="value">XXX</span>
                            <span class="category">变速箱</span>
                        </div>
                        <div class="detailContainer">
                            <span class="value">XXX</span>
                            <span class="category">过户记录</span>
                        </div>
                        <div class="detailContainer">
                            <span class="value">XXX</span>
                            <span class="category">上架时间</span>
                        </div>
                    </div>
                </div>

                <!-- 4. 购车按钮 -->
                <button class="buyButton">预约看车</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.carDiv {
    margin: 40px 97px 30px 65px;
    height: 500px;
    display: flex;
    overflow: hidden;
}

.carPicture {
    width: 50%;
    display: flex;
    flex-direction: column;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */

}

.wholePicture {
    height: 100%; /* 使用百分比充满整个 .car-picture 的高度 */
    display: flex;
    align-items: center; /* 将子元素在交叉轴上居中对齐 */
}

.imageContainer {
    height: 100%;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    cursor: pointer;
}

.imageContainer img {
    width: 100%;
    height: auto; /* 保持图片宽高比例 */
    object-fit: cover;
}

.imageOverlay {
    position: absolute;
    bottom: 5px;
    right: 5px;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 5px;
    border-radius: 5px;
    font-size: 16px;
    color: #333;
}

.arrowContainerLeft,
.arrowContainerRight {
    width: 8%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

.arrowContainerLeft:hover {
    background-color: rgba(255, 255, 255, 0.8); /* 鼠标悬停时增加透明度 */
}

.arrowContainerRight:hover {
    background-color: rgba(255, 255, 255, 0.8); /* 鼠标悬停时增加透明度 */
}


.thumbnailContainer {
    overflow-x: auto;
    overflow-y: hidden !important; /* 禁用垂直滚动条 */
    display: flex;
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
    max-height: 200px;
    scroll-behavior: smooth; /* 添加平滑滚动效果 */
}

/* 滚动条整体样式 */
.thumbnailContainer::-webkit-scrollbar {
    height: 15px;
}

/* 滚动条滑块样式 */
.thumbnailContainer::-webkit-scrollbar-thumb {
    background-color: rgba(133, 126, 126, 0.5); /* 设置滑块颜色 */
    border-radius: 6px; /* 设置滑块的圆角 */
}

/* 滚动条轨道样式 */
.thumbnailContainer::-webkit-scrollbar-track {
    background-color: #ffffff; /* 设置滚动条轨道的颜色 */
    border-radius: 6px; /* 设置轨道的圆角 */
}


.thumbnails {
    display: flex;
    margin-bottom: 40px;
}

.thumbnail {
    width: 120px;
    height: 90px;
    margin-right: 10px; /* 调整缩略图之间的距离 */
    cursor: pointer;
    transition: transform 0.3s ease;
}

.thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}


.thumbnailContainer {
    display: flex;
    overflow: auto; /* 修改 overflow 为 auto */
    scroll-behavior: smooth; /* 添加平滑滚动效果 */
}

.thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.7; /* 添加半透明效果 */
}

.thumbnail.selected {
    border: 2px solid blue;
}

.thumbnail.selected img {
    opacity: 1; /* 选中的图片不透明 */
}

.carInfo {
  margin-left: 10px;
  margin-top: -20px;
    flex: 1; /* 占据剩余空间 */
    padding: 40px;
    display: flex;
    flex-direction: column;
}

.carName {
    display: flex;
    font-size: 25px;
    margin-bottom: 20px;
    margin-left: 40px;
}

.carPrice {
    display: flex;
    flex-direction: row;
     margin-left: 40px;
    margin-bottom: 30px;
}

.totalPrice {
    font-size: 32px;
    color: orangered;
    font-weight: bold;
}

.downPayment {
    font-size: 14px;
    margin-top: 18px;
    margin-left: 20px;
    color: #666; /* 灰色 */
}

.carDetails {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
}

.detailRow{
    display: flex;
    flex-direction: row;
}

.detailContainer {
    flex: 1;
    height: 65px;
    padding: 10px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
}

.value {
    font-size: 24px;
    color: black;
    text-align: center; /* 水平居中 */
}


.category {
    font-size: 14px;
    color: #a8a8a8;
    text-align: center; /* 水平居中 */
}


.buyButton {
    margin-left: 30px;
    margin-top: 5px;
    padding: 10px 20px;
    background-color: #ff8621;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    color: white;
    height: 50px;
    width: 160px;
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
    /* 添加样式 */
    transition: background-color 0.3s ease; /* 添加过渡效果 */
}

.buyButton:hover {
    background-color: #ffb072; /* 鼠标悬停时的背景颜色 */
}


.collection_icon{
  color: #f0a03c;
  margin-left: 20px;
  font-size: 35px;
  cursor: pointer;
}


.fade-enter-from{
    opacity: 0.5;
}
.fade-leave-to {
    opacity: 0.1;
}

.fade-enter-active{
    transition: opacity 0.5s;
}
.fade-leave-active {
    transition: opacity 0.5s;
}


</style>
