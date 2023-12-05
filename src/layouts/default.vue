<template>
  <div style="min-height: 500px">
    <RightSide />
    <UserMenu />
    <router-view />
    <Bottom />
  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
</style>
