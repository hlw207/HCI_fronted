<script setup lang="ts">

import {useWindowStore} from "~/stores/window";
import {Star, StarFilled} from "@element-plus/icons-vue";
import {computed, inject, ref, toRefs} from "vue";
import {throttle} from "lodash";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
import Popup from '~/pages/buy/components/popUp/index.vue';


const props = defineProps<{
    id: number,
    name: string,
    price: number,
    color: string,
    image: string,
    time: string,
    mileage: number,
    source: string,
    shine: boolean
}>()

const windows = useWindowStore()
const router = useRouter()
const position = ref()
const shine = ref(false)
const date = computed(() =>{
    let d = props.time.split('/')
    return d[0] + '年' + d[1] + '月'
})
const firstPay = computed(() => (props.price / 4).toFixed(2))



const click = (event) => {
    const isPopupElement = event.target.closest('.popup');
    if(event.target.className != "collection_button" && event.target.tagName !="path"&& event.target.tagName !="svg"
        && !isPopupElement){
        router.push("/detail")
    }
}

const clickStar = () => {
    ElMessage.success("成功关注")
    shine.value = true
}

const cancelStar = () => {
    ElMessage.success("取消关注")
    shine.value = false
}

const isPopupVisible = ref(false);
const showPopup = () => {
    isPopupVisible.value = true;
};

const closePopup = (event) => {
    const isPopupElement = event.target.closest('.popup_content');
    if(!isPopupElement){
        isPopupVisible.value = false;
    }
    if(isPopupElement && event.target.className=="close-button"){
        isPopupVisible.value = false;
    }
};


</script>

<template>
    <div class="collection" @click="click">
        <div class="collection_container">
            <div class="collection_picture">
                <el-image :src="props.image" class="collection_picture_main"></el-image>
            </div>
            <el-icon class="collection_icon">
                <StarFilled class="show" v-if="shine" @click="cancelStar"/>
                <StarFilled style="color: #9ba3af" v-if="!shine" @click="clickStar"><Star /></StarFilled>
            </el-icon>
        </div>
        <div class="collection_text">
            <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin: 10px 8px 0">
                <span>{{props.name}} 2021款 586E</span>
            </div>
            <div style="color: #9ba3af;font-size: 11px;margin: 5px 0 0 8px">
                {{date}} / {{props.mileage}}万公里 / {{props.source}}
            </div>
            <div style="display:flex;margin: 20px 0 3px 8px;position: relative">
                <span style="color: #fa5c3d;font-size: 20px">{{props.price}}万</span>
                <div style="margin: 10px 0 0 12px">
                    <span style="font-size: 11px;color: #9ba3af;">首付{{firstPay}}万</span>
                </div>
                <div class="collection_button" @click="showPopup">免费咨询</div>
                <Popup v-if="isPopupVisible" @click="closePopup" />
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes myFirst
{
    0% {opacity: 0; margin-top: 0}
    50% {opacity: 1; margin-top: -10px}
    100% {opacity: 1; margin-top: 0}
}

.collection{
    box-sizing: border-box;
    width: 25%;
    margin: 1% 1%;
    cursor: pointer;
    padding: 1px 1px 5px;
}

.collection:hover{
    border: 1px solid red;
}

.collection_container{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.collection_picture{
    overflow: hidden;
    width: 100%;
}

.collection_picture_main{
    width: 100%;
    transition: all 0.5s;
}

.collection_picture_main:hover{
    transform: scale(110%);
    transition: all 0.5s;
}

.collection_text{
    font-size: 13px;
    text-align: left;
}

.collection_button{
    position: absolute;
    right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    color: #fa5c3d;
    border: 1px solid #fa5c3d;
    padding: 5px 10px;
    margin-left: 18px;
}

.collection:hover .collection_button{
    background: #fa5c3d;
    color: white;
}

.collection_icon{
    position: absolute;
    color: #f0a03c;
    bottom: 5px;
    right: 10px;
    font-size: 25px;
    cursor: pointer;
}

.collection_cancel{
    z-index: 999;
    position: absolute;
    top: 35px;
    right: -5px;
    width: 70px;
    color: black;
    font-size: 13px;
    text-align: center;
    border-radius: 5px;
    border: 1px solid rgba(161, 160, 160, 0.3);
}

.collection_cancel_main{
    margin: 1px 0;
    padding-top: 3px;
}

.collection_cancel_main:hover{
    color: #26aeea;
    background: rgba(128, 128, 128, 0.1);
}

.show{
    animation: myFirst 0.5s;
}
</style>
