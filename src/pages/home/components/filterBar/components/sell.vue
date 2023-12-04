<template>

  <div class="sellContainer">
    <div class="sellUser" v-if="!loginState">
      <el-input placeholder="请输入手机号" />

      <div style="display: flex;flex-direction: row;align-items: center;margin-top: 10px">
        <el-input v-model="cert" maxlength="6" placeholder="验证码" style="margin-right: 10px;height: 30px"/>
        <el-button color="#eda01f" style="width: 70px;font-size: 10px;height: 28px" plain @click="loginState=true">获取验证码</el-button>
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

  <el-dialog v-model="sellDialogShow">

    <h1 style="color: #eda01f;margin-top: -20px">先估价，再买车，心里倍儿有底</h1>

    <template #footer>
      <el-form :model="form" label-width="120px">
        <el-form-item label="卖车地点">
          <el-cascader
              size="large"
              :options="options"
              v-model="form.location"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="车型">
          <el-cascader
              size="large"
              :options="options"
              v-model="form.type"
          >
          </el-cascader>
        </el-form-item>
        <el-form-item label="上牌时间">
          <el-col :span="11">
            <el-date-picker
                v-model="form.createTime"
                type="date"
                placeholder="选择您的爱车的上牌时间"
                style="width: 100%"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="行驶里程">
          <el-input-number
              v-model="form.distance"
              :min="1"
              controls-position="right"
              size="large"
          />
        </el-form-item>
        <el-form-item label="接收手机">
          <el-input v-model="form.phone" placeholder="请输入您的手机号" style="width: 50%;"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="width: 100%;display: flex;flex-direction: row;justify-content: end;align-items: center">
            <el-button size="large"  color="#eda01f"  type="primary" style="color: white" @click="onSubmit">爱车估价</el-button>
            <el-button size="large" color="#eda01f" @click="sellDialogShow = false" plain>取消</el-button>
          </div>
        </el-form-item>
      </el-form>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {provinceAndCityData} from "element-china-area-data";


const loginState = ref(false)
const cert = ref('')
const sellDialogShow = ref(false)
const options = provinceAndCityData

const circleUrl = ref('https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')


const form = ref({
  location: [],
  type: [],
  createTime: '',
  distance: 0,
  phone: ''
})

const handleChange = (value) =>{
  console.log(value)
}
const onSubmit = () => {
  alert(form.value.type)
  console.log(form)
}
</script>

<style scoped>
.sellContainer{
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: row;
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
  padding-right: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #808080;
  margin-right: 10px;
}
</style>
