<template>
    <div class="modalOverlay">
        <div class="telephoneContainer">
            <div class="formContainer">
                <input class="phoneInput" placeholder="请输入手机号"  v-model="phoneNumber"/>
                <button class="phoneButton" @click="submitForm">提交</button>
                <div style="width: 100%;display: flex;flex-direction: row;justify-content: center;align-items: center">
                    <el-checkbox style="margin-right: 10px" v-model="agreement"></el-checkbox>
                    <span style="color: #b2b2b2;font-size: 12px">
                        我已阅读并同意
                        <el-link type="warning" style="font-size: 12px;margin-top: -5px">《用户使用协议》</el-link>及
                        <el-link type="warning" style="font-size: 12px;margin-top: -5px">《隐私权条款》</el-link>
                    </span>
                </div>
            </div>
            <div class="reservationClose" @click="closeReservation">
                <span>&times;</span>
            </div>
        </div>
    </div>
</template>

<script>
import {ElMessage} from "element-plus";

export default {
    data() {
        return {
            phoneNumber: '',
            agreement: false,
        };
    },
    methods: {
        closeReservation() {
            this.$emit("close-reservation");
        },
        submitForm() {
            if (!this.agreement) {
                this.$nextTick(() => {
                    this.$message({
                        message: '请先勾选同意条款',
                        type: 'warning',
                    });
                });
            } else if (!this.phoneNumber) {
                this.$nextTick(() => {
                    this.$message({
                        message: '请输入手机号',
                        type: 'warning',
                    });
                });
            } else {
                this.$emit("submit-form");
            }
        },
    },
};
</script>

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

.telephoneContainer {
    position: fixed;
    top: 50%;
    left: 50%;
    background-color: white;
    transform: translate(-50%, -50%);
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    padding: 20px;
    max-width: 400px;
    text-align: center;
}

.title p {
    margin: 10px 0;
    font-size: 18px;
    color: #333;
}

.formContainer {
    margin-top: 20px;
}

.phoneInput {
    width: 50%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    font-size: 16px;
}

.phoneButton {
    background-color: #eda01f;
    margin-left: 20px;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

.checkboxContainer {
    margin-top: 20px;
}

.checkboxContainer label {
    margin-left: 10px;
    font-size: 14px;
    color: #555;
}

.reservationClose {
    cursor: pointer;
    font-size: 20px;
    color: #888;
    position: absolute;
    top: 10px;
    right: 10px;
}

.reservationClose span {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
}
</style>
