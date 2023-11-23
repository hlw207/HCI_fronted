<script setup lang="ts">

import {ref} from "vue";
import {FolderOpened} from "@element-plus/icons-vue";

const src = ref("https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/profile/0.jpg")
const accept = ref("image/jpeg,image/png,image/png")
const fileSrc = ref(null)

const fileChange = () =>{
}

</script>

<template>
  <div style="width: 40%;height: 300px;margin-top: 40px">
    <div class="profile">
      <div class="profile_main">
        <div style="width: 50%">
          <el-image class="profile_image" :src="fileSrc != null ? fileSrc : src"></el-image>
          <div style="margin-top: 10px;color: #9ba3af;font-size: 13px">
            当前头像
          </div>
        </div>
      </div>
      <div v-if="fileSrc == null">
        <el-upload action="https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/">123</el-upload>
        <el-upload action="https://box.nju.edu.cn/thumbnail/07d3ddadbcd84a228e26/1024/profile" :show-file-list="false" :limit="1" :accept="accept" :on-change="fileChange">
          <div class="profile_choose_main">
            <div style="display: flex">
              <el-icon style="font-size: 20px;margin-right: 10px;margin-bottom: 2px;color: #9fa7af"><FolderOpened /></el-icon>
              选择本地照片
            </div>
          </div>
        </el-upload>
      </div>
    </div>
    <div class="profile_explain">
      请选择图片上传：大小180 * 180像素支持JPG、PNG等格式
      <br>
      图片需小于2M
    </div>
    <div style="display: flex;  justify-content:center; align-items:center;">
      <div class="profile_update" :class="{profile_update_active : fileSrc != null}">
        更新
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile{
  display: flex;
  height: 150px;
  width: 100%;
}

.profile_main{
  display: flex;
  width: 30%;
  justify-content:center;
  align-items:center;
  border-right: 2px solid #e3e5e7;
}

.profile_image{
  width: 100%;
  border-radius: 100px;
  border: 1px solid yellow;
}

.profile_choose_main{
  display: flex;
  margin: 20px 30px;
  background: #f1f2f5;
  width: 200px;
  height: 110px;
  color: #71818f;
  justify-content:center;
  align-items:center;
  font-size: 14px;
  border-radius: 3px;
}

.profile_explain{
  text-align: center;
  margin-top: 30px;
  margin-right: 50px;
  font-size: 11px;
  color: #9ba3af;
}

.profile_update{
  display: flex;
  margin-top: 30px;
  margin-right: 60px;
  justify-content:center;
  align-items:center;
  height: 38px;
  width: 120px;
  background: #f4f5f7;
  color: #d2dae6;
  border-radius: 5px;
  text-align: center;
}

.profile_update_active{
  background: #26aeea;
  color: white;
  cursor: pointer;
}
</style>