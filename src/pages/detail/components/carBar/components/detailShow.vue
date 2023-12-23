<script setup lang="ts">
const props = defineProps<{
  content: string,
  title: string
}>()
</script>

<template>
  <div class="detail_show">
    <div class="detail_show_content">{{props.content}}</div>
    <div class="detail_show_title">{{props.title}}</div>
  </div>
</template>

<style scoped>
.detail_show{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 45px;
  margin-bottom: 15px;
}

.detail_show_content{
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #333;
}

.detail_show_title{
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #bbb;
}
</style>