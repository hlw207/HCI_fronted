<template>
  <div class="sideBarItem" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <el-icon :color="iconColour" size="18px" class="icon">
      <component :is="props.icon" />
    </el-icon>
    <span v-if="props.text !== ''">{{ props.text }}</span>
  </div>
</template>

<script setup lang="ts">
import {Message} from "@element-plus/icons-vue";
import {ref} from "vue";

const iconColour = ref("#eda01f")

const props = defineProps(['icon','text'])
const handleMouseEnter = () => {
  iconColour.value = "#ffffff"
}

const handleMouseLeave = () => {
  iconColour.value = "#eda01f"
}
</script>

<style scoped lang="scss">
*{
  transition: 0.2s;
}
.sideBarItem{
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 15px;
  border-bottom: 1px solid rgba(237, 160, 31, 0.5);
  cursor: pointer;
  color: #75767a;
}

.sideBarItem:hover {
  background-color: #eda01f;
  color: white;
}

.icon{
  vertical-align: middle;
  margin: 8px;
}
</style>
