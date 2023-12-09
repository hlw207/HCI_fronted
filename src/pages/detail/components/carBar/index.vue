<script setup lang="ts">
import {ref, onMounted, computed, watch, reactive} from 'vue';
import ImageModal from '~/pages/detail/components/image/imageModal.vue';
import {Star, StarFilled} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";
import {useUserStore} from "~/stores/user";
import {request} from "~/utils/request";
import {useRoute} from "vue-router";
import Telephone from "~/pages/detail/components/reservationBar/telephone.vue";
import More from "~/pages/detail/components/reservationBar/more.vue";

const user = useUserStore()
const route = useRoute()
const ImageModalRef = ref()
const car = reactive({
  name: '',
  price: 0,
  carDistance: Number,
  carAge: '',
  carPosition: '',
  carGear: '',
  carRecord: '无',
  carTime: ''
})

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
const shine = ref(false)
const showTelephone = ref(false);
const showMore = ref(false);

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
  request({
    url: '/cars/collection',
    method: 'POST',
    params: {
      userId: useUserStore().id,
      carId: route.params.id
    }
  }).then((res)=>{
  })
  ElMessage.success("成功关注")
  shine.value = true
}

const cancelStar = () => {
  request({
    url: '/cars/collection',
    method: 'DELETE',
    params: {
      userId: useUserStore().id,
      carId: route.params.id
    }
  }).then((res)=>{
  })
  ElMessage.success("取消关注")
  shine.value = false
}

const openReservation = () => {
    showTelephone.value = true;
    showMore.value = false;
};

const closeReservation = () => {
    showTelephone.value = false;
    showMore.value = false;
};

const submitForm = () => {
    showTelephone.value = false;
    showMore.value = true;
};

const leftArrowImage = computed(() => isLeftArrowHovered.value ? '../../../../public/pictures/arrow-left-over.jpg' : '../../../../public/pictures/arrow-left.jpg');
const rightArrowImage = computed(() => isRightArrowHovered.value ? '../../../../public/pictures/arrow-right-over.jpg' : '../../../../public/pictures/arrow-right.jpg');

watch(()=>user.id,()=>{
  if(user.id != -1){
    request({
      url: '/cars/collection',
      method: 'GET',
      params: {
        userId: user.id,
        carId: route.params.id
      }
    }).then((res)=>{
      shine.value = res.data
    })
  }
})

onMounted(() => {
    scrollToSelectedThumbnail();
    if(user.id != -1){
      request({
        url: '/cars/collection',
        method: 'GET',
        params: {
          userId: user.id,
          carId: route.params.id
        }
      }).then((res)=>{
        shine.value = res.data
      })
    }
  request({
    url: `/cars/${route.params.id}`,
    method: 'GET',
  }).then((res)=>{
    car.name = res.data.name
    car.carPosition = res.data.carPosition
    car.carAge = res.data.carAge
    car.carGear = res.data.carGear
    car.carDistance = res.data.carDistance
    car.price = res.data.price
    car.carTime = res.data.carTime
  })
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
                  {{car.name}}
                  <el-icon class="collection_icon" v-if="useUserStore().id != -1">
                    <StarFilled class="show" v-if="shine" @click="cancelStar"/>
                    <StarFilled style="color: #9ba3af;" v-if="!shine" @click="clickStar"><Star /></StarFilled>
                  </el-icon>
                </div>

                <!-- 2. 车辆价格 -->
                <div class="carPrice">
                    <span class="totalPrice">{{car.price}}万</span>
                    <span class="downPayment">首付: {{car.price / 4}}万</span>
                </div>

                <!-- 3. 详细信息 -->
                <div class="carDetails">
                    <div class="detailRow">
                        <div class="detailContainer">
                            <span class="value">{{car.carDistance}}</span>
                            <span class="category">车辆里程</span>
                        </div>
                        <div class="detailContainer">
                            <span class="value">{{car.carPosition}}</span>
                            <span class="category">车辆所在地</span>
                        </div>
                        <div class="detailContainer">
                            <span class="value">{{car.carAge}}</span>
                            <span class="category">上牌时间</span>
                        </div>
                    </div>

                    <div class="detailRow">
                        <div class="detailContainer">
                            <span class="value">{{car.carRecord}}</span>
                            <span class="category">过户记录</span>
                        </div>
                        <div class="detailContainer">
                            <span class="value">{{car.carGear}}</span>
                            <span class="category">变速箱</span>
                        </div>
                        <div class="detailContainer">
                            <span class="value">{{car.carTime}}</span>
                            <span class="category">上架时间</span>
                        </div>
                    </div>
                </div>

                <!-- 4. 购车按钮 -->
                <button class="buyButton" @click="openReservation">预约看车</button>

                <Telephone v-if="showTelephone" @close-reservation="closeReservation" @submit-form="submitForm"/>
                <More v-if="showMore" @close-reservation="closeReservation"/>

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
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

}

.wholePicture {
    height: 100%;
    display: flex;
    align-items: center;
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
    height: auto;
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
    background-color: rgba(255, 255, 255, 0.8);
}

.arrowContainerRight:hover {
    background-color: rgba(255, 255, 255, 0.8);
}


.thumbnailContainer {
    overflow-x: auto;
    overflow-y: hidden !important; /* 禁用垂直滚动条 */
    display: flex;
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
    max-height: 200px;
    scroll-behavior: smooth;
}

.thumbnailContainer::-webkit-scrollbar {
    height: 15px;
}

.thumbnailContainer::-webkit-scrollbar-thumb {
    background-color: rgba(133, 126, 126, 0.5);
    border-radius: 6px;
}

.thumbnailContainer::-webkit-scrollbar-track {
    background-color: #ffffff;
    border-radius: 6px;
}


.thumbnails {
    display: flex;
    margin-bottom: 40px;
}

.thumbnail {
    width: 120px;
    height: 90px;
    margin-right: 10px;
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
    overflow: auto;
    scroll-behavior: smooth;
}

.thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.7;
}

.thumbnail.selected {
    border: 2px solid blue;
}

.thumbnail.selected img {
    opacity: 1;
}

.carInfo {
  margin-left: 10px;
  margin-top: -20px;
    flex: 1;
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
    color: #666;
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
    font-size: 21px;
    color: black;
    text-align: center;
}


.category {
    font-size: 14px;
    color: #a8a8a8;
    text-align: center;
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
