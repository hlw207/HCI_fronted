<script setup lang="ts">

import {ref} from "vue";

const src = "../../../../public/pictures/profile/0.jpg"

const change = (e) =>{
  alert(choice)
}
</script>

<template>
  <div style="width: 40%;height: 200px">
    <div class="profile">
       <div class="profile_main">
          <el-image class="profile_image" :src="src"></el-image>
       </div>
       <div class="profile_resize">
         <input type="file" accept="image/jpg" placeholder="选择本地照片" @change="change">
         <label for="inputId">Input Label</label>
         <input type="text" id="inputId">
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
  width: 40%;
  justify-content:center;
  align-items:center;
  border-right: 2px solid #e3e5e7;
}

.profile_image{
  width: 50%;
  border-radius: 100px;
  border: 1px solid yellow;
}

.profile_resize{
  width: 60%;
  background: #db2828;
}
</style>