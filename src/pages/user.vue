<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useWindowStore} from "~/stores/window";
import {useUserStore} from "~/stores/user";
import Right_side from "~/components/right_side.vue";
import User_menu from "~/components/user_menu.vue";

const window = useWindowStore()
const height = window.height - 45
const user = useUserStore()


onMounted(() =>{
})

</script>

<template>
  <Right_side />
  <User_menu  page-index="/user"/>
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
  height: v-bind(height + 'px');
  display: flex;
}
.user{
  width: 30%;
  background: #db2828;
}
.collection{
  width: 69%;
  background: #42b8dd;
}
.collection .menu{
  height: 15%;
  background: #21ba45;
}
</style>