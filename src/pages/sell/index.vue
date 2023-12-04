<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
</script>

<style>
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color:#eda01f;
  border-color:#eda01f;
}
.el-checkbox__input.is-checked + .el-checkbox__label {
  color: #eda01f;
}
.el-checkbox.is-bordered.is-checked{
  border-color: #eda01f;
}
.el-checkbox__input.is-focus .el-checkbox__inner{
  border-color:  #eda01f;
}
</style>

<style scoped>

</style>
