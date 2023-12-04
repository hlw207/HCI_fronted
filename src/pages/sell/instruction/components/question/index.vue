<template>
  <div class="question">
    <div class="questionTitle">
      <p>{{props.title}}</p>
    </div>

    <div class="questionContent">
      <p>{{props.content}}</p>
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  title: String,
  content: String
})

</script>

<style scoped>
.question{
  width: 500px;
  margin: 10px;
  display: flex;
  flex-direction: column;
}
.questionTitle{
  color: white;
  font-size: 15px;
  padding-left: 10px;
  border-radius: 20px;
  background-color: #eda01f;
}
.questionContent{
  text-indent: 2em;
  padding: 10px;
  font-size: 15px;
  line-height: 30px;
  color: #989898;
}
</style>
