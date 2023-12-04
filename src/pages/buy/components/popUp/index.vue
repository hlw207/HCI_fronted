<script setup lang="ts">
import {computed, defineComponent, defineEmits, provide, ref} from 'vue';
import {ElMessage, ElNotification} from "element-plus";
import {useRouter} from "vue-router";
import Newpop from "~/pages/buy/components/newPop/index.vue"

const { emit } = defineEmits(['close']);
const close = () => {
    emit('close');
};

const shineUp = ref(false)
const Get = (e) => {
    shineUp.value = !shineUp.value;
}

const router = useRouter()

const onSubmit = () => {
    if(shineUp.value){
        showPopup()
    }else {
    }

}

const isPopupVisible = ref(false);
const showPopup = () => {
    isPopupVisible.value = true;
};

const closePopup = () => {
    isPopupVisible.value = false;
};

</script>

<template>
    <div class="popup">
        <div class="popup_content">
            <button class="close-button" @click="close">×</button>
            <div style="color: #3f3f3f;font-size: 25px;margin: 40px 0 0 8px;
                    display: flex; justify-content: center; align-items: center;">
                您咨询的车辆
            </div>
            <div class="input-wrapper">
                <div class="border-wrapper">
                    <input class="custom-input" id="phone-input" type="text" placeholder="请输入您的手机号">
                    <button class="input-button" id="submit-button" @click="onSubmit">提 交</button>
                    <Newpop v-if="isPopupVisible"/>
                    <div class="flex-row">
                        <label class="checkbox-container">
                            <input class="custom-checkbox" id="agree-checkbox" type="checkbox" @click="Get(this)">
                            <span class="checkmark"></span>
                        </label>
                        <label>请务必勾选此项，阅读并同意《用户服务协议》、《隐私政策》提交并注册为用户。</label>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>


<style>
.popup {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(63, 63, 63, 0.5);
    z-index: 9999;
}

.popup_content {
    position: relative;
    background-color: #fff;
    width: 500px;
    height: 300px;
    padding: 20px;
    border-radius: 10px;
}

.close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: #888;
}

.close-button:hover {
    color: #000;
}

.input-wrapper {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.border-wrapper {
    position: relative;
    width: 70%;
}

.custom-input {
    width: 100%;
    outline: none;
    padding: 10px;
    box-sizing: border-box;
    color: #000;
    border-radius: 6px;
    font-family: inherit;
    font-size: 15px;
    border: 1px solid #ccc;
}

.custom-input::placeholder{
    opacity: 0.5;
}

.custom-input:hover,
.custom-input:focus {
    border-color: orange;
    box-shadow: 0 0 5px orange;
}

.input-button{
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: inherit;
    font-size: 18px;
    color: #fff;
    background-color: #ff7940;
    border: none;
    width: 100%;
    padding: 12px 16px;
    gap: 8px;
    margin: 12px 0;
    cursor: pointer;
    border-radius: 6px;
    box-shadow: 0px 0px 3px rgb(255, 121, 64), 0px 2px 3px rgb(255, 121, 64);
}

.flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
}

.checkbox-container {
    display: inline-block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 16px;
    user-select: none;
}

.custom-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 4px;
    transition: background-color 0.3s;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.checkmark:after {
    content: "";
    position: absolute;
    display: none;
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
}

.custom-checkbox:checked ~ .checkmark {
    background-color: #ff7940;
    box-shadow: 0 3px 7px rgba(243, 138, 33, 0.3);
}

.custom-checkbox:checked ~ .checkmark:after {
    display: block;
}

@keyframes checkAnim {
    0% {
        height: 0;
    }

    100% {
        height: 10px;
    }
}

.custom-checkbox:checked ~ .checkmark:after {
    animation: checkAnim 0.2s forwards;
}



</style>
