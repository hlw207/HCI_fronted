<script setup lang="ts">

import {Refresh, SwitchButton} from "@element-plus/icons-vue";
import {ref} from "vue";
import {ElMessage} from "element-plus";

const show = ref(false)

const certain = () =>{
  show.value = false
  ElMessage.success("取消看车成功")
}
</script>

<template>
  <div class="record">
    <div class="car">
      <div class="car_container">
        <el-image src="../../../../../public/pictures/car/0.jpg" class="car_picture_main"></el-image>
      </div>
      <div class="car_text">
        <div style="display: flex;flex-wrap: wrap;margin-top: 5px;margin-left: 8px">
          <span>日产-轩逸 2012款 经典 1.6XE 自动舒适版</span>
        </div>
        <div style="display: flex;margin: 5px 8px;">
          <div style="font-size: 14px">
            售价:
          </div>
          <div style="color: #f2711c;margin-left: 3px;font-size: 14px">
            ￥123万
          </div>
        </div>
      </div>
    </div>
    <div class="state">
      <div class="state_up">
        <div class="state_no">
          <div class="state2">
            <el-icon style="font-size: 13px"><Refresh /></el-icon>
          </div>
          <div class="state_text">
            看车
          </div>
        </div>
        <div class="state_line"></div>
        <div class="state_no">
          <div class="state1"></div>
          <div class="state_text">
            预约
          </div>
        </div>
        <div class="state_line"></div>
        <div class="state_no">
          <div class="state1"></div>
          <div class="state_text">
            复检
          </div>
        </div>
        <div class="state_line"></div>
        <div class="state_no">
          <div class="state1"></div>
          <div class="state_text">
            过户
          </div>
        </div>
      </div>
      <div class="state_bottom">
        <div class="state_bottom_text">
          <div>看车时间： </div>
          <div style="color: #9ba3af;margin-top: 2px">2023-12-04 11:15</div>
        </div>
        <div class="state_bottom_text">
          <div>看车地点： </div>
          <div style="color: #9ba3af;">北京市</div>
        </div>
      </div>
      <div class="state_button">
        <div class="cancel" @click="show = true">
          <el-icon style="font-size: 16px"><SwitchButton /></el-icon>
          <div style="margin-top: -1px;margin-left: 6px">取消看车</div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="show" width="20%" align-center title="确认取消看车？">
    <div style="margin-top: -36px;font-size: 10px;color: rgba(255,0,0,0.7)">注：取消后无法恢复</div>
    <div style="display: flex;align-items: center;justify-content: center;margin-top: 25px">
      <div class="certain_button button2" @click="show = false">取消</div>
      <div class="certain_button button1" @click="certain">确认</div>
    </div>
  </el-dialog>
</template>

<style scoped>
.record{
  display: flex;
  margin-bottom: 50px;
  padding: 0 50px;
}

.car{
  box-sizing: border-box;
  width: 30%;
  height: 90%;
  cursor: pointer;
  padding: 1px;
}

.car:hover{
  border: 1px solid #f2711c;
}

.car_container{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.car_picture_main{
  width: 100%;
  transition: all 0.5s;
}

.car_picture_main:hover{
  transform: scale(110%);
  transition: all 0.5s;
}

.car_text{
  font-size: 13px;
  text-align: left;
  color: black;
}

.state{
  box-sizing: border-box;
  width: 70%;
  padding: 0 25px;
}

.state_up{
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 80px;
}

.state_line{
  background: #f2711c;
  margin: 0 5px;
  height: 3px;
  width: 100px;
}

.state_no{
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.state1{
  width: 10px;
  height: 10px;
  background: #f2711c;
  border-radius: 50px;
}

.state2{
  width: 18px;
  height: 18px;
  background: #f2711c;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #f9ccb7;
  color: white;
}

.state_text{
  font-size: 13px;
  position: absolute;
  top: 35px;
}

.state_bottom{
  margin-top: 50px;
  padding-left: 80px;
}

.state_bottom_text{
  display: flex;
  font-size: 13px;
  margin-bottom: 8px;
}

.state_button{
  margin-right: 60px;
  display: flex;
  justify-content: right;
  height: 50px;
}

.cancel{
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #9ba3af;
  padding: 0 8px;
  cursor: pointer;
}

.cancel:hover{
  background: rgba(155, 163, 175, 0.1);
}

.certain_button{
  display: flex;
  justify-content:center;
  align-items:center;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
  margin: 0 10px;
  padding: 6px 18px;
}

.button1{
  background: #f2711c;
  color: white;
}

.button2{
  border: 1px solid rgba(128, 128, 129, 0.3);
}
</style>