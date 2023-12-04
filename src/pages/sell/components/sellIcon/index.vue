<template>
  <div class="sellIconContainer">
    <img :src=props.iconURL width="80" height="80" />
    <div class="sellIconTitle">
      <p>{{props.title}}</p>
    </div>
    <div  class="sellIconContent">
      <p>{{props.content}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  iconURL: String,
  title: String,
  content: String
})
</script>

<style scoped>
.sellIconContainer{
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.sellIconTitle{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 22px;
}

.sellIconContent{
  margin-top: -20px;
  color: #a6a6a6;
}
</style>
