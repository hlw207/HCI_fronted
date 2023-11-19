<script setup lang="ts">


import {computed, ref, watch} from "vue";
import {useUserStore} from "~/stores/user";
import {ElMessage} from "element-plus";

const user = useUserStore()
const username = ref(user.username)
const autoGraph = ref(user.autoGraph)
const isUpdate = computed(() => username.value != user.username || autoGraph.value != user.autoGraph)

const cancel = () => {
  username.value = user.username;
  autoGraph.value = user.autoGraph
}

const certain = () => {
  user.username = username.value;
  user.autoGraph = autoGraph.value;
  ElMessage({
    message: '更新成功',
    type: 'success',
  })
}
</script>

<template>
  <div class="info">
    <div style="color: #26aeea;font-size: 15px;padding-left: 5px;border-left: 3px solid #26aeea;">
      我的信息：
    </div>
    <div style="margin-left: 10px;margin-top: 25px">
      <div class="info_text">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;昵称： </span>
        <el-input v-model="username" class="info_text_input" maxlength="10"></el-input>
      </div>
      <div class="info_text" style="margin-top: 15px;margin-left: 2px">
        <span>&nbsp;&nbsp;&nbsp;用户名：</span>
        <div style="margin-top: 2px">
           <span style="color: #9ba3af;">&nbsp;saisai_{{user.id}}</span>
        </div>
      </div>
      <div class="info_text" style="margin-top: 20px">
        <span>个性签名：</span>
        <el-input v-model="autoGraph" class="info_text_input_1" maxlength="150" show-word-limit :rows="3" type="textarea" :autosize="{ minRows: 3, maxRows: 4 }"></el-input>
      </div>
      <div class="info_text" style="margin-top: 10px;margin-left: 2px">
        <span>&nbsp;&nbsp;&nbsp;手机号：</span>
        <div style="margin-top: 2px">
          <span style="color: #9ba3af;">&nbsp;{{user.phone}}</span>
        </div>
        <div style="margin-top: 2px;margin-left: 30px;font-size: 11px;cursor: pointer">
          <span style="color: #26aeea;">换绑手机号</span>
        </div>
      </div>
      <div class="info_text" style="margin-top: 12px;margin-left: 2px">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密码：</span>
        <div style="margin-top: 3px;margin-left: 10px;font-size: 11px;cursor: pointer">
          <span style="color: #26aeea;">修改密码</span>
        </div>
      </div>
      <div class="info_text_button" style="margin-top: 20px;margin-right: 40px">
        <div style="display: flex">
          <div class="info_text_button_style button_0" @click="cancel">取消</div>
          <div class="info_text_button_style" :class="{button_1 : isUpdate, button_2: !isUpdate}" @click="certain">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info{
  box-sizing: border-box;
  width: 60%;
  padding: 40px 30px 30px 105px;
}

.info_text{
  display: flex;
  color: #606369;
  font-size: 14px;
}

.info_text_input{
  width: 150px;
  height: 25px;
  font-size: 12px;
}

.info_text_input_1{
  width: 400px;
  height: 90px;
  font-size: 12px;
}

.info_text_button{
  display: flex;
  justify-content:center;
  align-items:center;
  height: 60px;
}

.info_text_button_style{
  display: flex;
  justify-content:center;
  align-items:center;
  border-radius: 5px;
  font-size: 13px;
  cursor: pointer;
  padding: 10px 40px;
  margin: 10px 20px;
}

.button_0{
  background: #f4f5f7;
  color: black;
}

.button_1{
  background: #26aeea;
  color: white;
}

.button_2{
  background: #f4f5f7;
  color: #d2dae6;
  pointer-events: none;
}

.button_3{
  background: #f2711c;
  color: white;
}
</style>