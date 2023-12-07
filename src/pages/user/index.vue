<script setup lang="ts">
import UserCollectionPage from "~/pages/user/components/collection/userCollectionPage.vue";
import {useWindowStore} from "~/stores/window";

const window = useWindowStore()
const width = window.width
const height = window.height
</script>
<template>
  <div class="user">
    <div class="user_main">
      <UserCollectionPage />
    </div>
  </div>
</template>

<route lang="yaml">
    meta:
       layout: user
</route>

<style scoped>
.user{
  margin-right: 32px;
  background: #f7f4f5;
  padding: 0 v-bind(width / 11 + 'px') 30px;
  animation: myFirst 0.5s;
}

.user_main{
  margin-top: 15px;
  padding-top: 20px;
  background: white;
}

@keyframes myFirst
{
  0% {
    margin-top: -10px;
    opacity: 0;
  }
  100% {
    margin-top: 0;
    opacity: 1;
  }
}
</style>