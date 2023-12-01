<script setup lang="ts">
const props = defineProps<{
  title: string,
  type: string,
  choice: string
}>()

const emits = defineEmits(['choose'])

const choose = () => {
  emits('choose', props.type, props.title)
}
</script>

<template>
  <div class="title" :class="{title_active : title == choice}" @click="choose">
    {{title}}
  </div>
</template>

<style scoped>
.title{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
  padding: 3px 8px;
  font-size: 11px;
  cursor: pointer;
}

.title:hover{
  color: #fa5325;

}

.title_active{
  background: #fa5325;
  color: white;
}

.title_active:hover{
  color: white;
}
</style>