<template>
  <div class="fixView">
    <RightSide />
    <UserMenu />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

.fixView{
  width:1500px;
  height:500px;
  MARGIN-RIGHT: auto;
  MARGIN-LEFT: auto;
}
</style>
