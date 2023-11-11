<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useWindowStore} from "~/stores/window";
import {useUserStore} from "~/stores/user";
import Right_side from "~/components/right_side.vue";
import UserMenu from "~/components/userMenu.vue";
import UserBack from "~/components/user/userBack.vue";

const window = useWindowStore()
const user = useUserStore()
const width = window.width
const height = window.height - 45
const a = ref(false)

const ifFixed = ref(false)

</script>

<template>
  <Right_side />
  <UserMenu page-index="/user" :if-fixed="ifFixed" />
  <div class="user">
    <UserBack />

    <div class="user_menu">
      123
    </div>

    <div class="user_main">
      123
    </div>
  </div>
</template>

<style scoped>
.user{
  height: v-bind(height + 'px');
  padding-left: v-bind(width / 11 + 'px');
  padding-right: v-bind(width / 11 + 32 + 'px');
  background: #f4f5f7;
  text-align: right;
}

.user_menu{
  height: v-bind(height / 13 + 'px');
  background: white;
}

.user_main{
  margin-top: 15px;
  height: 500px;
  background: white;
}
</style>