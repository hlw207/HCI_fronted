<script setup lang="ts">
const props = defineProps<{
  type: string
  content: string
}>()

const emits = defineEmits(['cancel'])
</script>

<template>
  <div class="box">
    <div class="box_left">{{content}}</div>
    <div class="box_right" @click="emits('cancel',props.type)">X</div>
  </div>
</template>

<style scoped>
.box{
  display: flex;
  align-items: center;
  border: 1px solid rgba(242, 113, 28, 0.5);
  margin: 2px 4px 0;
}

.box:hover{
  display: flex;
  align-items: center;
  border: 1px solid #f2711c;
}

.box:hover .box_right{
  background: #f2711c;
}

.box_left{
  display: flex;
  padding: 1px 7px;
  align-items: center;
  font-size: 11px;
}

.box_right{
  display: flex;
  align-items: center;
  background: rgba(242, 113, 28, 0.5);
  cursor: pointer;
  color: white;
  font-size: 14px;
  padding: 1px 3px;
}
</style>