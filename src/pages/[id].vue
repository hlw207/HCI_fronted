<script setup lang="ts">
import {useRoute} from 'vue-router'
import {ref} from "vue";
import UserMenu from "~/components/userMenu.vue";
import Right_side from "~/components/right_side.vue";

const route = useRoute()
const ifFixed = ref(false)
</script>

<template>
  <Right_side />
  <UserMenu :page-index="'/' + route.params['id']" :ifFixed="ifFixed" />
</template>

<style scoped>
.test{

}
</style>