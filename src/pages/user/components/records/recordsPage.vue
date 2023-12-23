<script setup lang="ts">

import RecordLine from "~/pages/user/components/records/recordLine.vue";
</script>

<template>
  <div>
    <div class="record_top">
      看车记录：
    </div>
    <div>
      <RecordLine />
      <RecordLine />
      <RecordLine />
      <RecordLine />
      <RecordLine />
      <RecordLine />
    </div>
  </div>
</template>

<style scoped>
.record_top{
  color: #f2711c;
  font-size: 15px;
  padding-left: 5px;
  border-left: 3px solid #f2711c;
  margin-left: 10px;
  margin-bottom: 40px;
}
</style>