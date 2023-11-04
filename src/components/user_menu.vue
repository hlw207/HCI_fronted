<script setup lang="ts">
import {useWindowStore} from "~/stores/window";
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";

const props = defineProps<{
  pageIndex: string
}>()

const router = useRouter()
const windows = useWindowStore()
const height = windows.height
const width = windows.width
const choice = ref(["我要买车","我要卖车","功能待定","个人主页"])
const menus = ref([{is : false, path: "/"},
                         {is : false, path: "/buy"},
                         {is : false, path: "/copy"},
                         {is : false, path: "/pay"},
                         {is : false, path: "/user"}])

const router_to = (num : number) => {
  router.push(menus.value[num].path)
}

onMounted(() =>{
  let i : number;
  for (i = 0;i < 5;i++){
    if (props.pageIndex == menus.value[i].path){
      menus.value[i].is = true
    }
  }
})
</script>

<template>
  <div class="user_menu">
    <el-image src="../../public/pictures/trademark.png"></el-image>
    <div class="menu menu1" :class="{menu_active: menus[0].is}" @click="router_to(0)">
      <span>首页</span>
    </div>
    <template v-for="(menu, index) in choice">
      <div class="menu" :class="{menu_active: menus[index + 1].is}" @click="router_to(index + 1)">
          <span>{{menu}}</span>
      </div>
    </template>
    <span class="phone">
      联系我们： 15971989001
    </span>
  </div>
</template>

<style scoped>
.user_menu{
  display: flex;
  height: 45px;
  background: #fcfcfc;
  padding-left: v-bind(width/10 + 'px');
}
.menu{
  margin: 4px 5px;
  padding: 10px 20px;
  text-align: center;
  color: #2a2c37;
  font-size: 12px;
}
.menu1{
  margin-left: v-bind(width/5 + 'px');
}
.menu_active{
  font-weight: bold;
  border-bottom: 2px solid #21ba45;
}
.menu:hover{
  font-weight: bold;
  border-bottom: 2px solid #21ba45;
}
.phone{
  margin: 4px 60px;
  padding: 10px 20px;
  font-size: 12px;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>