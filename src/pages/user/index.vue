<script setup lang="ts">

import UserCollectionPage from "~/pages/user/components/collection/userCollectionPage.vue";
</script>
<template>
  <div class="user_main">
    <UserCollectionPage />
  </div>
</template>

<route lang="yaml">
    meta:
       layout: user
</route>

<style scoped>

.user_main{
  margin-top: 15px;
  padding-top: 10px;
  background: white;
  overflow-y: auto;
}
</style>