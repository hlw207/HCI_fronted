<template>
  <div class="headBar">
    <div class="phoneInputContainer">
      <h2 style="color: #f2711c; margin-left: -130px">爱车估价</h2>
      <div class="inputContainer">
        <el-input
            v-model="phoneNumber"
            minlength="11"
            maxlength="11"
            type="tel"
            placeholder="请输入手机号"
            style="width: 80%;height: 40px"
        />
        <el-button color="#f2711c"  style="margin-left: -80px;z-index: 1;color: white;height: 100%" @click="handlePhoneNumberSubmit">开始估价</el-button>
      </div>
      <div style="width: 80%;margin-left: 10px;padding: 20px;display: flex;flex-direction: row;justify-content: center;align-items: center">
        <el-checkbox style="margin-right: 10px" v-model="agreement"></el-checkbox>
        <span style="color: #b2b2b2;font-size: 12px">
              我已阅读并同意
          <el-link type="warning" style="font-size: 12px;margin-top: -5px;color: #f2711c">《用户使用协议》</el-link>及
          <el-link type="warning" style="font-size: 12px;margin-top: -5px;color: #f2711c">《隐私权条款》</el-link>
        </span>
      </div>
    </div>
    <div class="feature">
      <div class="featureTitle">
        保卖服务
      </div>

      <div class="featureItems">
        <SellIcon class="icon01" :icon-u-r-l=" PICTURE_ADDR + '/sell/feature02.png'" title="高价卖车" content="面向全国买家"/>
        <SellIcon class="icon02" :icon-u-r-l=" PICTURE_ADDR + '/sell/feature01.png'" title="专人服务" content="专业服务顾问指导"/>
        <SellIcon class="icon03" :icon-u-r-l=" PICTURE_ADDR + '/sell/feature03.png'" title="省时省心" content="车辆过户不操心"/>
      </div>
    </div>
  </div>

  <div class="instructionBar">
    <div style="color: #f2711c;font-size: 30px">
      <p>高价卖车流程</p>
    </div>
    <div class="instructionBarItems">
      <SellIcon :icon-u-r-l="PICTURE_ADDR + '/sell/instruction01.png'" title="在线快速预约"/>
      <el-icon :size="40" color="#f2711c">
        <CaretRight />
      </el-icon>
      <SellIcon :icon-u-r-l="PICTURE_ADDR + '/sell/instruction02.png'" title="免费上门评估"/>
      <el-icon :size="40" color="#f2711c">
        <CaretRight />
      </el-icon>
      <SellIcon :icon-u-r-l="PICTURE_ADDR + '/sell/instruction03.png'" title="当天速拿车款"/>
      <el-icon :size="40" color="#f2711c">
        <CaretRight />
      </el-icon>
      <SellIcon :icon-u-r-l="PICTURE_ADDR + '/sell/instruction04.png'" title="省心代办过户"/>

    </div>
  </div>

  <div class="questionBarContainer">
    <div class="questionBar">
      <div style="color: #f2711c;font-size: 25px">
        <p>- 卖车问答 -</p>
      </div>
      <div class="questionBarItems">
        <div class="questionBarRow">
          <Question
              title="Q1 怎么帮我卖车？"
              content="人人车是专业二手车交易服务平台，每天有百万买家在这里选车，我们只将您的爱车卖给真实买家，在把您的爱车卖个公道价格的同时，完全杜绝了经销商、4S店对您的骚扰。"/>
          <Question
              title="Q2 出售车辆需要什么费用？"
              content="在人人车平台，车辆卖家从车辆信息发布到卖车意向确定整个过程，我们不会收取任何费用。卖家可放心在平台发布车辆信息，匹配合适买家。"/>
        </div>
        <div class="questionBarRow">
          <Question
              title="Q3 卖车流程是什么？"
              content="在填写车辆信息或联系我们之后，评估师将上门对车辆进行初步评估和拍照，并根据人人车大数据提供建议售价。符合上架标准的车辆将在人人车平台上发布，并进行多方推广。有购买意向的买家会与您约见看车，并签署《二手车买卖合同》。您需要配合进行车辆复检，通过后办理车辆过户。"/>
          <Question
              title="Q4 在人人车转让需要准备什么？"
              content="需要先在网站提供您的联系电话，车辆品牌、型号等基本信息。待服务人员联系您后，在约定时间内准备好
              &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        1、身份证&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        2、行驶证&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        3、车辆登记证&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        4、车辆钥匙&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        5、车示标（环保标、检字标、交强险标）&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        6、交强险单&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        7、购置税本及购置税发票&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        8、购车发票/最近一次过户发票"/>
        </div>
      </div>
    </div>
  </div>

  <div v-show="fixInputVisible" class="fixInputContainer">
    <div class="fixInput">
      <div style="display: flex;flex-direction: row;justify-content: center;align-items: center;width: 80%">
        <el-input
            v-model="phoneNumber"
            minlength="11"
            maxlength="11"
            type="tel"
            placeholder="请输入手机号"
            style="width: 80%;height: 40px"
        />
        <el-button color="#f2711c"  style="/margin-left: 20px;color: white;height: 40px" @click="handlePhoneNumberSubmit">开始估价</el-button>
      </div>
      <div style="width: 90%;display: flex;flex-direction: row;justify-content: center;align-items: center">
        <el-checkbox style="margin-right: 10px" v-model="agreement"></el-checkbox>
        <span style="color: #b2b2b2;font-size: 12px">
              我已阅读并同意
          <el-link type="warning" style="font-size: 12px;margin-top: -5px;color: #f2711c">《用户使用协议》</el-link>及
          <el-link type="warning" style="font-size: 12px;margin-top: -5px;color: #f2711c">《隐私权条款》</el-link>
        </span>
      </div>
    </div>
  </div>


  <el-dialog v-model="dialogTableVisible" width="30%" center top="20%">
    <div class="certifyContainer">
      <el-image :src="PICTURE_ADDR + '/sell/certify.png'" style="width: 60px;height: 60px;position: relative;top: -80px" />
      <div class="certifyPic">
        <el-input v-model="certifyPicCode" placeholder="请输入图片验证码" minlength="4" maxlength="4" clearable />
        <CertifyCode @update="updateCertify"/>
      </div>
      <div class="certifyCode">
        <el-input v-model="certifyPhoneCode" placeholder="请输入您收到的验证码" minlength="6" maxlength="6" clearable />
        <p style="color: #f2711c;width: 110px;height: 50px;margin-left: -110px;z-index: 1;cursor: pointer" @click="handleGetCertifyCode" text>{{certifyPhoneMessage}}</p>
      </div>
      <el-button color="#f2711c" style="width: 200px;color: white;height: 40px;margin-bottom: -10px" @click="handleCertificationSubmit">提交</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {ElMessage, ElNotification} from "element-plus";
import SellIcon from '../components/sellIcon/index.vue'
import Question from './components/question/index.vue'
import CertifyCode from "~/pages/sell/instruction/components/certifyCode/index.vue";
import { useRouter} from "vue-router";
import {CaretRight} from "@element-plus/icons-vue";
import {useUserStore} from "~/stores/user";
import {PICTURE_ADDR} from "~/config";

onMounted(() => {
  window.addEventListener("scroll",handleScroll)
  setTimeout(() => {
    featureTop.value = '-150px'
  }, 50); // 500毫秒延迟
  setTimeout(() => {
    showIcon01.value = 1
  }, 500); // 500毫秒延迟
  setTimeout(() => {
    showIcon02.value = 1
  }, 1000); // 500毫秒延迟
  setTimeout(() => {
    showIcon03.value = 1
  }, 1500); // 1000毫秒延迟
  document.documentElement.scrollTop = 0
})

const user = useUserStore()
const phoneNumber = ref(user.phone)
const agreement = ref(false)
const route = useRouter()
const fixInputVisible = ref(false)
const dialogTableVisible = ref(false)
const certifyPicCode = ref('')
const certifyPhoneCode = ref('')
const certifyPhoneMessage = ref('获取短信验证码')
const certifyGetable = ref(true)

const certifyCode = ref('')
const code = ref('')
const featureTop = ref('-500px')
const showIcon01 = ref(0)
const showIcon02 = ref(0)
const showIcon03 = ref(0)


const handlePhoneNumberSubmit = () => {
    if (!agreement.value){
        ElMessage({
            message: '请先勾选同意条款',
            type: 'warning',
        })
    } else if(!phoneNumber.value){
        ElMessage({
            message: '请输入手机号',
            type: 'warning',
        })
    } else {
      const phonePattern = /^1\d{10}$/;
      if(!phonePattern.test(phoneNumber.value)){
        ElMessage({
          message: '手机号格式错误',
          type: 'warning',
        })
        return
      }
      setTimeout(()=>{
        if(user.id != -1&&user.phone == phoneNumber.value) {
          route.push('/sell/form')
          return
        }
        dialogTableVisible.value = true
      },10)
    }
}

watch(()=>user.phone,(val)=>{
  phoneNumber.value = val
})

const updateCertify = (certify: string) => {
  certifyCode.value = certify
}

const handleScroll = () => {
  fixInputVisible.value = window.scrollY > 327
}

const handleGetCertifyCode = () => {
  if (!certifyGetable.value){
    return
  }
  code.value = user.gainCode()
  ElNotification({
    title: '验证码',
    message: '验证码为' + code.value,
    type: 'success',
    duration: 20000
  })
  let timeCount = 10
  certifyGetable.value = false
  const timeInterval = setInterval(() => {
    timeCount--
    certifyPhoneMessage.value = String(timeCount) + '秒后重新获取'
    if(timeCount === 0){
      clearInterval(timeInterval)
      certifyPhoneMessage.value = '获取短信验证码'
      certifyGetable.value = true
    }
  },1000)
}

const handleCertificationSubmit = () => {
  if(!certifyPicCode.value){
    ElMessage.warning("请输入图形验证码")
  }else if(!certifyPhoneCode.value){
    ElMessage.warning("请输入验证码")
  }else {
    if(certifyPicCode.value != certifyCode.value)
      ElMessage.warning("图形验证码错误")
    else if(code.value == '')
      ElMessage.warning("未获取验证码")
    else if(certifyPhoneCode.value != code.value){
      ElMessage.warning("验证码错误")
    }else {
      route.push('form')
    }
  }
}
</script>

<style>
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color:#f2711c;
  border-color:#f2711c;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #f2711c;
}
.el-checkbox.is-bordered.is-checked{
  border-color: #f2711c;
}
.el-checkbox__input.is-focus .el-checkbox__inner{
  border-color:  #f2711c;
}
</style>

<style scoped>

.headBar{
  height: 400px;
  background-image: url('/pictures/sell/sellBanner.jpg');
}

.phoneInputContainer{
  width: 300px;
  height: 200px;
  background-color: #fff;
  position: relative;
  left: 12%;
  top: 100px;
  border-radius: 5px;
  box-shadow: 30px -16px #f2711c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


.inputContainer{
  display: flex;
  flex-direction: row;
  width: 95%;
  justify-content: center;
  align-items: center;
}

.feature{
  width: 45%;
  height: 300px;
  position: relative;
  left: 45%;
  top: v-bind(featureTop);
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 30px -16px #f2711c;
  transition: 0.6s;

}

.featureTitle{
  width: 100%;
  height: 20%;
  color: #f2711c;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
}

.featureItems{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
  transition: 0.6s ease-in-out;
}

.instructionBar{
  margin-right: 32px;
  box-sizing: border-box;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.instructionBarItems{
  padding-right: 32px;
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}


.questionBarContainer{
  margin-right: 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.questionBar{
  width: 90%;
  background-color: rgba(173, 173, 173, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  margin-bottom: 100px;
}

.questionBarItems{
  width: 100%;
}

.questionBarRow{
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: start;
}

.fixInputContainer{
  position: fixed;
  margin-right: 32px;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 999;
}

.fixInput{
  width: 400px;
  height: 100px;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px 2px #bbbbbb;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}


.leftNav {
  height: 90vh;
  width: 200px;
  background-color: #ccc;
}

.icon01{
  opacity: v-bind(showIcon01);
  transition: 0.6s;
}

.icon02{
  opacity: v-bind(showIcon02);
  transition: 0.6s;
}

.icon03{
  opacity: v-bind(showIcon03);
  transition: 0.6s;
}

.certifyContainer{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.certifyPic{
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: -50px;
  margin-bottom: 10px;
}

.certifyCode{
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
}

</style>
