<script setup lang="ts">
import { ref} from 'vue';

const isOpen = ref(false);
let imageUrl;

const openModal = (url) => {
    imageUrl = url;
    isOpen.value = true;
};
defineExpose({ openModal })

const closeModal = () => {
    isOpen.value = false;
};
</script>


<template>
    <transition name="fade">
        <div v-if=isOpen class="modalOverlay" @click="closeModal">
            <div class="modalContent">
                <p class="exitText">点击任意位置退出</p>
                <el-image :src="imageUrl" alt="放大图片" />
            </div>
        </div>
    </transition>
</template>

<style scoped>
.modalOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modalContent {
    overflow: hidden;
}

.modalContent img {
    width: 100%;
    height: auto;
    object-fit: contain;
}

.exitText {
    position: absolute;
    top: 10px;
    left: 20px;
    color: white;
    font-size: 24px;
    cursor: pointer;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
}
</style>
