<template>

  <div class="sellContainer">
    <div class="sellUser" v-if="!loginState">
      <el-input placeholder="请输入手机号" />

      <div style="display: flex;flex-direction: row;align-items: center;margin-top: 10px">
        <el-input v-model="cert" maxlength="6" placeholder="验证码"/>
        <el-button color="#eda01f" style="width: 80px" plain @click="loginState=true">获取验证码</el-button>
      </div>
    </div>

    <div class="sellUser" v-else>
      <el-avatar :size="50" :src="circleUrl" />
      <el-button color="#eda01f" style="margin-top: 10px;margin-bottom: 10px" plain>#114514</el-button>
      <span style="color: #b2b2b2;font-size: 15px">欢迎回来</span>
    </div>

    <div class="sellPredict">
      <el-button color="#eda01f" style="width: 180px;height: 50px" @click="sellDialogShow=true" plain>爱车估价</el-button>
      <div style="padding: 20px;display: flex;flex-direction: row;justify-content: center;align-items: center">
        <el-checkbox style="margin-right: 10px"></el-checkbox>
        <span style="color: #b2b2b2;font-size: 10px">
                我已阅读并同意《用户使用协议》及<el-link type="warning" style="font-size: 12px;margin-top: -5px">《隐私权条款》</el-link>
        </span>
      </div>
    </div>
  </div>

  <el-dialog v-model="sellDialogShow" title="Shipping address">

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="sellDialogShow = false">Cancel</el-button>
        <el-button type="primary" @click="sellDialogShow = false">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";


const loginState = ref(false)
const cert = ref('')
const sellDialogShow = ref(false)

const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

</script>

<style scoped>
.sellContainer{
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.sellPredict{
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sellUser{
  width: 40%;
  height: 100%;
  padding-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #808080;
}
</style>
