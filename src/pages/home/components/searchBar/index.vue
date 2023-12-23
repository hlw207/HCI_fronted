<template>
  <div class="searchBarContainer">
    <el-image style="height: 100%;width: 100%;z-index: 0;position: relative" src="../../../public/pictures/back.png"></el-image>
  </div>
</template>

<script setup lang="ts">

</script>



<style scoped lang="scss">
.searchBarContainer{
  position: relative;
  z-index: 0;
  margin-top: -45px;
  margin-right: 32px;
  height: 335px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title{
  color: #eda01f;
}

.searchInputBar{
  display: flex;
  flex-direction: row;
  align-items: center;
}

.searchInput{
  width: 600px;
  height: 50px;
  outline: none;
}

.searchBtn{
  margin-left: -135px;
  z-index: 5;
  height: 40px;
}

</style>
