<script lang="ts" setup>
import {onMounted} from "vue";
import {useUserStore} from "~/stores/user";

onMounted(() => {
  const userStore = useUserStore()
  userStore.fetch()
  let date = new Date()

})

</script>

<template>
  <router-view />
</template>
