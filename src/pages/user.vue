<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useWindowStore} from "~/stores/window";
import {useUserStore} from "~/stores/user";
import Right_side from "~/components/right_side.vue";
import UserMenu from "~/components/userMenu.vue";

const window = useWindowStore()
const user = useUserStore()
const width = window.width
const height = window.height - 45

const ifFixed = ref(false)

onMounted(() =>{
})

</script>

<template>
  <Right_side />
  <UserMenu page-index="/user" :if-fixed="ifFixed" />
  <div class="flex_container">
    <div class="user">

    </div>
    <div class="collection">
      <div class="menu">

      </div>
    </div>
  </div>
</template>

<style scoped>
.flex_container{
  height: v-bind(height - 200 + 'px');
  display: flex;
  padding: 50px;
  margin: 50px;
  background: #f2711c;
}
.user{
  width: 30%;
  margin-right: 100px;
  background: #db2828;
}
.collection{
  width: 70%;
  background: #42b8dd;
}
.collection .menu{
  height: 15%;
  background: #21ba45;
}
</style>