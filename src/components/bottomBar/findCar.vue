<template>
    <div class="bottomFind">
        <div class="findCarContainer">
            <div class="find">
                <div class="findPicture">
                    <img src="../../../public/pictures/findCar.png" alt="Image" />
                </div>

                <div class="findText">
                    <p class="title">没有喜欢的车辆？</p>
                    <p class="text">把想要的车辆告诉我们！</p>
                    <p class="text">当有符合要求的车辆上架，第一时间通知您！</p>
                </div>
            </div>

            <div class="selectContainer">
                <div class="row">
                    <div class="dropdownContainer" @click="searchShow = true">
                        <label for="preOrderCar">预购车辆类型：</label>
                        <div>
                            <input class="carType" placeholder="不限"  @input="searchShow = false" v-model="typeData"/>
                            <CascaderChoose :left="805" :top="75" class="cascaderChoose" :is-show="searchShow" @disShow="searchShow = false" @submit="submit" v-model="typeData" />
                        </div>
                    </div>

                    <div class="dropdownContainer">
                        <label for="carAge">车龄要求：</label>
                        <select id="carAge" v-model="selectedCarAge">
                            <option value="age0">不限</option>
                            <option value="age1">1年以内</option>
                            <option value="age2">2年以内</option>
                            <option value="age3">3年以内</option>
                            <option value="age4">4年以内</option>
                            <option value="age5">5年以内</option>
                            <option value="age6">6年以内</option>
                            <option value="age7">7年以内</option>
                            <option value="age8">8年以内</option>
                        </select>
                    </div>
                </div>

                <div class="row">
                    <div class="dropdownContainer">
                        <label for="carTime">预计提车时间：</label>
                        <select id="carTime" v-model="selectedCarTime">
                            <option value="time0">不限</option>
                            <option value="time1">1~2周内</option>
                            <option value="time2">1个月内</option>
                            <option value="time3">2个月内</option>
                            <option value="time4">3个月内</option>
                            <option value="time5">半年内</option>
                        </select>
                    </div>

                    <div class="dropdownContainer">
                        <label for="carPrice">购车预算：</label>
                        <select id="carPrice" v-model="selectedCarPrice">
                            <option value="price0">不限</option>
                            <option value="price1">3万以下</option>
                            <option value="price2">3-5万</option>
                            <option value="price3">5-8万</option>
                            <option value="price4">8-10万</option>
                            <option value="price5">10-15万</option>
                            <option value="price6">15-20万</option>
                            <option value="price7">20-30万</option>
                            <option value="price8">30万以上</option>
                        </select>

                    </div>
                </div>

                <div class="row">
                    <div class="inputContainer">
                        <label for="carDescription">喜爱车辆描述：</label>
                        <textarea id="carDescription" v-model="carDescription" rows="3" style="resize: none;"></textarea>

                    </div>
                </div>

                <div class="row">
                    <div class="inputContainer">
                        <label for="contactPhone">联系电话：</label>
                        <input type="text" id="contactPhone" v-model="contactPhone" />
                        <button class="notifyButton" @click="notifyMe">有符合车辆通知我</button>
                    </div>
                </div>

                <div v-if="showPhoneError" class="errorText">请输入手机号</div>

                <Notify v-if="showNotify" @close-notify="closeNotify" />


            </div>
        </div>
    </div>
</template>

<script>
import Notify from "~/components/bottomBar/notify.vue";
import {ref} from "vue";

export default {
    data() {
        return {
            searchShow: false,
            typeData: '',
            selectedCarAge: "age0",
            selectedCarTime: "time0",
            selectedCarPrice: "price0",
            carDescription: "",
            contactPhone: "",
            showPhoneError: false,
            showNotify: false,
        };
    },
    methods: {
        notifyMe() {
            if (!this.contactPhone) {
                this.showPhoneError = true;
            } else {
                this.showPhoneError = false;
                this.showNotify = true;
                this.typeData = "";
                this.selectedCarAge = "age0";
                this.selectedCarTime = "time0";
                this.selectedCarPrice = "price0";
                this.carDescription = "";
                this.contactPhone = "";
            }
        },
        closeNotify() {
            this.showNotify = false;
        },
        submit(third) {
            this.typeData = third;
        },
    }
};
</script>

<style scoped>
.bottomFind {
    position: relative;
    width: 100%;
    background: #ebebeb;
}

.findCarContainer {
    margin-right: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

.find{
  /*background: #f2711c;*/
    width: 40%;
    display: flex;
    align-items: center;
}

.findPicture{
    width: 80%;
    margin-left: 20px;
    margin-right: 20px;
}

.findPicture img {
    width: 100%;
    height: auto;
}

.findText {
    max-width: 300px;
}

.title {
    color: #eda01f;
    font-weight: bold;
    font-size: 36px;
}

.text {
    color: black;
    font-size: 24px;
}

.selectContainer {
    width: 40%;
    flex-grow: 1;
    margin-left: 60px;
    margin-right: 50px;
    height: 290px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background: #f8f8f9;
    font-size: 14px;
}

.carType{
    margin-left: 10px;
    width: 150px;
    padding: 8px;
    box-sizing: border-box;
    margin-right: 6px;
    font-size: 14px;
}

.carType::placeholder {
    font-size: 14px;
}

/*.cascaderChoose{*/
/*    position: absolute;*/
/*    right: 365px;*/
/*    top: 70px;*/
/*}*/


.selectContainer select{
    margin-left: 10px;
    width: 150px;
    padding: 8px;
    box-sizing: border-box;
    margin-right: 6px;
}

.inputContainer textarea{
    width: 450px;
    padding: 8px;
    box-sizing: border-box;
}

.inputContainer input{
    margin-left: 30px;
    width: 200px;
    padding: 8px;
    box-sizing: border-box;
}

.selectContainer select:hover,
.selectContainer select:focus,
.inputContainer textarea:hover,
.inputContainer textarea:focus,
.inputContainer input:hover,
.inputContainer input:focus {
    border-color: #888;
}

.selectContainer select,
.inputContainer textarea,
.inputContainer input {
    font-size: 15px;
}


.row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}

.dropdownContainer {
    width: 48%;
    display: flex;
    align-items: center;
}

.inputContainer {
    display: flex;
    align-items: baseline;
}

.inputContainer label {
    margin-right: 10px;
}

textarea,
input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    margin-top: 5px;
}

.notifyButton {
    background-color: orange;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    width: 200px;
    margin-left: 30px;
}

.notifyButton:hover {
    background-color: darkorange;
}

.errorText{
    margin-left: 130px;
    color: red;
}
</style>
