<template>
  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<script setup lang="ts">
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


.fade-enter-from{   /* 进入时的透明度为0 和 刚开始进入时的原始位置通过active透明度渐渐变为1 */
  opacity: 0;
  transform: translateX(-100%);
}

.fade-enter-to{   /*定义进入完成后的位置 和 透明度 */
  transform: translateX(0%);
  opacity: 1;
}

.fade-leave-active,.fade-enter-active {
  transition: all 0.5s ease-out;
}

.fade-leave-from { /* 页面离开时一开始的css样式,离开后为leave-to，经过active渐渐透明 */
  transform: translateX(0%);
  opacity: 1;
}

.fade-leave-to{   /* 这个是离开后的透明度通过下面的active阶段渐渐变为0 */
  transform: translateX(100%);
  opacity: 0;
}
</style>
