<script setup lang="ts">
import {ref, watch} from "vue";
import {useUserStore} from "~/stores/user";
import {useRouter} from "vue-router";
const user = useUserStore()
const phone = ref(user.phone)
const router= useRouter()

watch(user,(()=>{
  if(phone.value != user.phone)
    phone.value = user.phone
}))
</script>

<template>
  <div class="sellContainer">
    <div class="sell_phone">
      <div class="sell_left">
        <input v-model="phone" class="sell_input" placeholder="请输入手机号">
      </div>
      <div class="sell_right">卖车</div>
    </div>
    <div class="sell_bottom" @click="router.push('/sell')">
      好车不和坏车卖 好车卖好价
    </div>
  </div>
</template>


<style scoped>
.sellContainer{
  box-sizing: border-box;
  width: 100%;
  height: 200px;
  padding-top: 50px;
}

.sell_phone{
  display: flex;
  margin-right: 30px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid rgba(128, 128, 128, 0.3);
}

.sell_left{
  width: 70%;
  border-radius:5px 0 0 5px;
  display: flex;
  align-items: center;
}

.sell_right{
  width: 30%;
  background: #f2711c;
  border-radius:0 5px 5px 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.sell_right:hover{
  background: #ee670f;
}

.sell_left:focus-within{
  outline: 1px solid #f2711c;
}

.sell_input{
  margin-left: 8px;
  width: 90%;
  height: 35px;
  border: none;
  box-shadow:none;
  outline: none;
}

.sell_input::placeholder{
  color: #9ba3af;
  font-size: 13px;
}

.sell_bottom{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-right: 30px;
  height: 50px;
  background: #e6e9fa;
  color: #353948;
  font-family: 黑体,serif;
  border-radius: 30px;
  font-size: 18px;
  letter-spacing: 0.3px;
  cursor: pointer;
}
</style>
