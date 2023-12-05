<template>
    <div class="notifyContainer">
        <div class="title">
            <p>提交成功</p>
        </div>
        <div class="text">
            <p>有符合车辆将第一时间通知您！</p>
        </div>
        <div class="notifyClose" @click="closeNotify">
            <span>&times;</span>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        closeNotify() {
            this.$emit("close-notify");
        },
    },
};
</script>

<style scoped>
.notifyContainer {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    max-width: 400px;
    text-align: center;
}

.title p {
    margin: 20px;
    font-size: 28px;
    color: green;
}

.text p {
    margin: 20px;
    font-size: 20px;
}

.notifyClose {
    cursor: pointer;
    font-size: 30px;
    color: #ccc;
    position: absolute;
    top: 10px;
    right: 10px;
}

.notifyClose span {
    display: inline-block;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
}
</style>
