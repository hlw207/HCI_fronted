<template>
  <div class="sellFormContainer">
    <div class="headBar">
      <div class="headBarTitle">
        <p>完善卖车信息</p>
      </div>
    </div>
    <div class="sellForm">
      <div class="detailForm">
        <div class="sellFormTitle">
          <el-image src="/public/pictures/sell/form01.png" style="margin-right: 10px;width: 30px;height: 30px" />
          <p>补充爱车信息</p>
        </div>
        <el-form label-width="120px" style="margin-left: 50px;margin-top: 50px;">
          <el-form-item class="formItem" label="品牌车型">
            <el-select size="large" @visible-change="closeIt" ref="selectIt"   ></el-select>
          </el-form-item>
          <el-form-item class="formItem" label="当前里程">
            <el-input-number
                v-model="form.distance"
                :min="1"
                controls-position="right"
                style="width: 200px"
            />
          </el-form-item>
          <el-form-item class="formItem" label="车辆所在地">
            <el-cascader
                size="large"
                :options="options"
                v-model="form.carLocation"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item class="formItem" label="上牌所在地">
            <el-cascader
                size="large"
                :options="options"
                v-model="form.licenseLocation"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item class="formItem" label="上牌时间">
            <el-date-picker
                v-model="form.time"
                type="date"
                placeholder="上牌日期"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="dateForm">
        <div class="sellFormTitle">
          <el-image src="/public/pictures/sell/form02.png" style="margin-right: 10px;width: 30px;height: 30px" />
          <p>预约验车时间</p>
        </div>
        <el-form label-width="120px" style="margin-left: 50px;margin-top: 50px;">
          <el-form-item class="formItem" label="检车时间">
            <el-date-picker
                v-model="form.checkTime"
                type="datetime"
                placeholder="选择一个您合适的验车时间"
                :shortcuts="shortcuts"
                :disabled-date="disabledDate"
                size="default"
            />
            <div style="margin-top: 20px;margin-left: -110px;width: 100%;display: flex;flex-direction: row;justify-content: center;align-items: center">
              <el-checkbox style="margin-right: 10px" v-model="form.anotherTime"></el-checkbox>
              <span style="color: #939393;font-size: 13px">
                时间不合适？联系工作人员和我预约特定时间
              </span>
            </div>
          </el-form-item>



          <el-form-item class="formItem" label="验车地址">
            <el-input style="width: 200px" v-model="form.checkLocation" />
          </el-form-item>
        </el-form>

        <div class="sellFormSubmit">
          <el-button color="#eda01f" style="color: white;width: 200px;height: 50px;margin-right: 20px" round @click="onSubmit">提交</el-button>
          <el-icon :size="25" color="#eda01f">
            <CaretRight />
          </el-icon>
          <p style="color: #eda01f">专员审核</p>
        </div>
      </div>
    </div>
    <div class="bottomBar">
      <el-steps :active="1" finish-status="success" simple>
        <el-step title="输入手机号" />
        <el-step title="完善相关信息" />
        <el-step title="等待审核" />
      </el-steps>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {provinceAndCityData} from "element-china-area-data";
import {ArrowDown, CaretRight, Search} from "@element-plus/icons-vue";
import {useRouter} from "vue-router";

const options = provinceAndCityData
const form = ref({
  type: [],
  distance: 1,
  carLocation: [],
  licenseLocation: [],
  time: '',
  checkTime: '',
  anotherTime: false,
  checkLocation: ''
})
const selectIt = ref()

const closeIt = () =>{
  selectIt.value.visible = false;
  setTimeout(()=>{
    selectIt.value.visible = true;
  },1000)
}

const shortcuts = [
  {
    text: '现在',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000)
      return date
    },
  },
  {
    text: '明天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24)
      return date
    },
  },
  {
    text: '后天',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + 3600 * 1000 * 24 * 2)
      return date
    },
  },
]

const disabledDate = (time: Date) => {
  return time.getTime() < new Date().getTime() - 86400000
}

const route = useRouter()
const onSubmit = () => {
  route.push('/sell')
  console.log(form.value)
}


</script>

<style>
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color:#eda01f;
  border-color:#eda01f;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #eda01f;
}
.el-checkbox.is-bordered.is-checked{
  border-color: #eda01f;
}
.el-checkbox__input.is-focus .el-checkbox__inner{
  border-color:  #eda01f;
}
</style>

<style scoped >
.sellFormContainer{
  margin-right: 32px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 690px;
}

.headBar{
  height: 400px;
  width: 100%;
  background-image: url('/pictures/sell/sellBanner.jpg');
}

.headBarTitle{
  position: relative;
  top: 30px;
  width: 400px;
  height: 50px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 20px -10px #eda01f;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #eda01f;
  font-size: 20px;
}

.sellForm{
  margin-top: -250px;
  width: 80%;
  height: 500px;
  background-color: #fff;
  box-shadow: 0 0 5px 2px #bbbbbb;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
}

.detailForm{
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.dateForm{
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
}

.sellFormTitle{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  font-size: 20px;
  color: #858585;
}

.sellFormSubmit{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.bottomBar{
  width: 100%;
  height: 100px;
  margin-top: 40px;
}

.formItem{
  margin-bottom: 30px;
}


</style>
