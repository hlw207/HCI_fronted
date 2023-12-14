<script setup lang="ts">
// import {UploadFilled} from "@element-plus/icons-vue";
// import {request} from "~/utils/request";
// import axios, {AxiosRequestConfig} from "axios";
// import {onMounted} from "vue";
// import RecordLine from "~/pages/user/components/records/recordLine.vue";
//
// const up = () =>{
//   request({
//     url: '/hello',
//     method : "POST",
//     params: {
//       str: "123"
//     }
//   }).then((res) =>{
//     alert(res.data)
//   })
// }
//
// const handleChange = (file: any) =>{
//   alert(file.name)
//   let formData=new FormData();
//   formData.append('file', file.raw)
//   request({
//     url: '/hello/file',
//     method: "POST",
//     data: formData,
//   })
// }

</script>

<template>
<!--  <el-upload-->
<!--      class="upload-demo"-->
<!--      drag-->
<!--      action="localhost:8081/hello/file"-->
<!--      :auto-upload="false"-->
<!--      :on-change="handleChange"-->
<!--  >-->
<!--    <el-icon class="el-icon&#45;&#45;upload"><upload-filled /></el-icon>-->
<!--    <div class="el-upload__text">-->
<!--      Drop file here or <em>click to upload</em>-->
<!--    </div>-->
<!--    <template #tip>-->
<!--      <div class="el-upload__tip">-->
<!--        jpg/png files with a size less than 500kb-->
<!--      </div>-->
<!--    </template>-->
<!--  </el-upload>-->
<!--  <el-button @click="up"></el-button>-->
  <div style="height: 458px">
    <More/>
  </div>
</template>

<style scoped>
</style>