<script setup lang="ts">

import {onMounted, ref} from "vue";
import parameterDetails from "~/pages/detail/components/configBar/components/detailInfo";

const props = defineProps<{
  info: string
}>()

</script>

<template>
  <div class="detail_info">
    {{props.info}}
  </div>
  <div class="detail_main">
    <template v-for="(info, index) in parameterDetails[props.info]">
      <div class="detail_main_box" :class="{box1: index % 3 == 2, box2: index % 6 >= 3}">
        <div class="detail_main_left">
          {{info.name}}
        </div>
        <div class="detail_main_right">
          {{info.value}}
        </div>
      </div>
    </template>
  </div>
  <div class="detail_bottom">
    以上参配信息仅供参考，实际参数配置以售卖车辆为准
  </div>
</template>

<style scoped>
.detail_info{
  display: flex;
  justify-content: center;
  background: #f5f5f5;
  font-size: 13px;
  padding: 10px 0;
}

.detail_main{
  margin-top: 5px;
  display: flex;
  flex-wrap: wrap;
}

.detail_main_box{
  display: flex;
  box-sizing: border-box;
  width: 32.6%;
  margin-right: 1.1%;
  border: 0.5px solid #ececec;
  background: white;
}

.box1{
  margin-right: 0;
}

.box2{
  background: #fdfdfd;
}

.detail_main_left{
  width: 45%;
  border-right: 1px solid #ececec;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  padding: 10px 0;
}

.detail_main_right{
  width: 55%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}

.detail_bottom{
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b2b0bf;
  font-size: 10px;
}
</style>