<template>
    <div class="modalOverlay">
        <div class="moreContainer">
            <div class="addressInput">
                <label for="myAddress">我的地址：</label>
                <input placeholder="请输入常用地址（帮助规划看车路线）" v-model="address" id="myAddress" />
            </div>

            <h3>预约时间（选择更多时间，可以提高预约成功几率噢）</h3>
            <table class="availabilityTable">
                <thead>
                <tr>
                    <th></th>
                    <th v-for="day in daysOfWeek">{{ day }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="time in timeSlots">
                    <td>{{ time }}</td>
                    <td v-for="day in daysOfWeek">
                        <input type="checkbox" :id="`${day}-${time}`" v-model="selectedSlots" :value="`${day}-${time}`" class="scaled-checkbox" />
                    </td>
                </tr>
                </tbody>
            </table>

            <div class="submitButton" @click="submitForm">
                <span>提交</span>
            </div>
            <div class="reservationClose" @click="closeReservation">
                <span>&times;</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            address: "",
            daysOfWeek: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            timeSlots: ["8:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
            selectedSlots: [],
        };
    },
    methods: {
        closeReservation() {
            this.$emit("close-reservation");
        },
        submitForm() {
            if (!this.address) {
                this.$nextTick(() => {
                    this.$message({
                        message: "请输入常用地址",
                        type: "warning",
                    });
                });
            } else if (this.selectedSlots.length === 0) {
                this.$nextTick(() => {
                    this.$message({
                        message: "请选择预约时间",
                        type: "warning",
                    });
                });
            } else {
                this.$nextTick(() => {
                    this.$message({
                        message: "预约成功",
                        type: "success",
                    });
                });
                this.$emit("close-reservation");
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

.moreContainer {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 50px;
    width: 800px;
    text-align: center;
}


.addressInput label {
    margin-right: 10px;
    font-size: 16px;
}


.addressInput input {
    width: 80%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    font-size: 16px;
}


.scaled-checkbox {
    position: relative;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 3px;
    outline: none;
    cursor: pointer;

    &:checked {
        background-color: #eda01f;
    }

    &:before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 10px;
        height: 5px;
    }
}

.availabilityTable {
    margin-top: 20px;
    width: 100%;
    border-collapse: collapse;
}

.availabilityTable th,
.availabilityTable td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
}

.submitButton {
    cursor: pointer;
    font-size: 20px;
    color: #ccc;
    margin-top: 20px;
}

.submitButton span {
    display: inline-block;
    padding: 10px;
    background-color: #eda01f;
    color: white;
    border-radius: 5px;
}

.reservationClose {
    cursor: pointer;
    font-size: 30px;
    color: #ccc;
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
