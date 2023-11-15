<script setup lang="ts">

import {onMounted, ref} from "vue";
import {FolderOpened} from "@element-plus/icons-vue";
import {useUserStore} from "~/stores/user";
import {PICTURE_ADDR} from "~/config";

const user = useUserStore()
const profileChoose = ref(false)
const imgPath = ref<string[]>([])
const choice = ref(-1)

const changeProfile = () =>{
  user.picture = imgPath.value[choice.value]
  choice.value = -1
  profileChoose.value = false
}

onMounted(()=>{
  let i;
  for(i = 0;i < 53;i++){
    let path : string = PICTURE_ADDR + "profile/" + (i % 4) + ".jpg"
    imgPath.value.push(path)
  }
})
</script>

<template>
  <div style="width: 40%;height: 300px;margin-top: 40px">
    <div class="profile">
       <div class="profile_main">
         <div style="width: 50%">
          <el-image class="profile_image" :src="user.picture"></el-image>
           <div style="margin-top: 10px;color: #9ba3af;font-size: 13px">
             当前头像
           </div>
         </div>
       </div>
      <div>
        <div class="profile_choose_main" @click="profileChoose=true">
          <div style="display: flex">
            <el-icon style="font-size: 20px;margin-right: 10px;margin-bottom: 2px;color: #9fa7af"><FolderOpened /></el-icon>
            从库中更换头像
          </div>
        </div>
      </div>
    </div>
    <div class="profile_explain">
      请选择图片上传：大小180 * 180像素支持JPG、PNG等格式
      <br>
      图片需小于2M
    </div>
    <div style="display: flex;  justify-content:center; align-items:center;">
       <div class="profile_update" :class="{profile_update_active : false}">
          更新
       </div>
    </div>
  </div>

  <el-dialog v-model="profileChoose" width="80%" :close="choice = -1">
    <div style="height: 450px;">
      <div>
        <div style="margin-left: 10px;margin-bottom: 15px;font-size: 15px;">
          请选择头像：
        </div>
        <div style="overflow-y: auto;height: 350px;">
          <template v-for="(path, index) in imgPath">
            <el-image class="profile_image_list" :class="{profile_image_list_active : choice == index}" :src="path" @click="choice = index"></el-image>
          </template>
        </div>
        <div style="display: flex;  justify-content:center;align-items:center;">
          <div class="profile_image_list_certain" :class="{profile_image_list_certain_active : choice != -1}" @click="changeProfile">选择头像</div>
        </div>
      </div>
    </div>
  </el-dialog>
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
  cursor: pointer;
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

.profile_image_list{
  width: 8%;
  margin: 8px 1.3%;
  cursor: pointer;
}

.profile_image_list_active{
  border: 5px solid #26aeea;
  width: 9%;
  transition: width 0.3s;
}

.profile_image_list:hover {
  border: 5px solid #26aeea;
  width: 9%;
  transition: width 0.3s;
}

.profile_image_list_certain{
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

.profile_image_list_certain_active{
  background: #26aeea;
  color: white;
  cursor: pointer;
}
</style>