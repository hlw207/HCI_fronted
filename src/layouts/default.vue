<template>
  <div>
    <RightSide />
    <UserMenu />
    <router-view></router-view>
    <Bottom />
  </div>
</template>

<script>
import Bottom from "~/components/bottom.vue";

export default {
  name: "index",
    components: {Bottom},
}
</script>

<style scoped>
</style>
