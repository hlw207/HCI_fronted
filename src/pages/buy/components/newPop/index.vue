<script setup lang="ts">


const { emit } = defineEmits(['close']);
const close = () => {
    emit('close');
};

</script>

<template>
    <div class="popup">
        <div class="popup_content">
            <button class="close-button" @click="close">×</button>
            <div class="heading">咨询</div>
            <form class="form">
                <input required="" class="input" type="email" name="email" id="email" placeholder="常用地址">
                <input required="" class="input" type="password" name="password" id="password" placeholder="上牌城市">
                <input class="login-button" type="submit" value="提交">
            </form>
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


.heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: rgb(255, 121, 64);
}

.form {
    margin-top: 20px;
}

.form .input {
    width: 90%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
}

.form .input::-moz-placeholder {
    color: rgb(170, 170, 170);
}

.form .input::placeholder {
    color: rgb(170, 170, 170);
}

.form .input:focus {
    outline: none;
    border-inline: 2px solid rgba(215, 162, 133, 0.87);
}

.form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(45deg, rgb(255, 121, 64) 0%, rgba(215, 162, 133, 0.87) 100%);
    color: white;
    padding-block: 15px;
    margin: 20px auto;
    border-radius: 20px;
    box-shadow: rgba(215, 162, 133, 0.87) 0px 20px 10px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
}

.form .login-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(215, 162, 133, 0.87) 0px 23px 10px -20px;
}

.form .login-button:active {
    transform: scale(0.95);
    box-shadow: rgba(215, 162, 133, 0.87) 0px 15px 10px -10px;
}

</style>
