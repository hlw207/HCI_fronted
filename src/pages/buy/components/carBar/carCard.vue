<script setup lang="ts">

import {StarFilled} from "@element-plus/icons-vue";
import {computed, ref} from "vue";
import {throttle} from "lodash";

const props = defineProps<{
    id: number,
    name: string,
    price: number,
    color: string,
    image: string,
    time: string,
    mileage: number,
    source: string
}>()


const position = ref()
const show = ref(false)
const date = computed(() =>{
    let d = props.time.split('/')
    return d[0] + '年' + d[1] + '月'
})
const firstPay = computed(() => (props.price / 4).toFixed(2))

const clickAt = () =>{
    window.removeEventListener('click',throttledHandle)

    show.value = false
}

const throttledHandle = throttle(clickAt, 100);
const showOut = () => {
    show.value = true
    setTimeout(() => {
        window.addEventListener('click',throttledHandle)
    }, 50);
}

const cancel_cars = () =>{
}

</script>

<template>
    <div class="buyCar">
        <div class="buyCar_container">
            <div class="buyCar_picture">
                <el-image :src="props.image" class="buyCar_picture_main"></el-image>
            </div>
            <el-icon class="buyCar_icon">
                <StarFilled @click="showOut"/>
                <div class="buyCar_cancel" v-if="show">
                    <div class="buyCar_cancel_main" ref="position" @click="cancel_cars">取消收藏</div>
                </div>
            </el-icon>
        </div>
        <div class="buyCar_text">
            <div style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin: 10px 8px 0">
                <span>{{props.name}}</span>
            </div>
            <div style="color: #9ba3af;font-size: 11px;margin: 5px 0 0 8px">
                {{date}} / {{props.mileage}}万公里 / {{props.source}}
            </div>
            <div style="display:flex;margin: 20px 0 3px 8px;position: relative">
                <span style="color: #fa5c3d;font-size: 20px">{{props.price}}万</span>
                <div style="margin: 10px 0 0 12px">
                    <span style="font-size: 11px;color: #9ba3af;">首付{{firstPay}}万</span>
                </div>
                <div class="buyCar_button">查看</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.buyCar{
    box-sizing: border-box;
    width: 23%;
    margin: 1% 1%;
    cursor: pointer;
    padding: 1px 1px 5px;
}

.buyCar:hover{
    border: 1px solid red;
}

.buyCar_container{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.buyCar_picture{
    overflow: hidden;
    width: 100%;
}

.buyCar_picture_main{
    width: 100%;
    transition: all 0.5s;
}

.buyCar_picture_main:hover{
    transform: scale(110%);
    transition: all 0.5s;
}

.buyCar_text{
    font-size: 13px;
    text-align: left;
}

.buyCar_button{
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

.buyCar:hover .buyCar_button{
    background: #fa5c3d;
    color: white;
}

.buyCar_icon{
    position: absolute;
    color: #f0a03c;
    bottom: 5px;
    right: 10px;
    font-size: 25px;
    cursor: pointer;
}

.buyCar_cancel{
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

.buyCar_cancel_main{
    margin: 1px 0;
    padding-top: 3px;
}

.buyCar_cancel_main:hover{
    color: #26aeea;
    background: rgba(128, 128, 128, 0.1);
}
</style>
