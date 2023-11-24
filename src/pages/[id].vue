<script setup lang="ts">
import {UploadFilled} from "@element-plus/icons-vue";
import {request} from "~/utils/request";
import axios, {AxiosRequestConfig} from "axios";

const up = () =>{
  request({
    url: '/hello',
    method : "POST",
    params: {
      str: "123"
    }
  }).then((res) =>{
    alert(res.data)
  })
}

const handleChange = (file: any) =>{
  alert(file.name)
  let formData=new FormData();
  formData.append('file', file.raw)
  let url = "https://box.nju.edu.cn/api/v2.1/share-links/07d3ddadbcd84a228e26/upload/"
  let config : AxiosRequestConfig<any> = {
    timeout: 5000,
    withCredentials: true
  }
  axios.post(url,formData,config)
  request({
    url: '/hello/file',
    method: "POST",
    data: formData,
  })
}

</script>

<template>
  <el-upload
      class="upload-demo"
      drag
      action="localhost:8081/hello/file"
      :auto-upload="false"
      :on-change="handleChange"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
  </el-upload>
  <el-button @click="up"></el-button>
</template>

<style scoped>
</style>