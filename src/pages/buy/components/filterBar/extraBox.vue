<script setup lang="ts">
import {CaretBottom, CaretTop} from "@element-plus/icons-vue";
import {computed, onMounted, ref, watch} from "vue";
import {throttle} from "lodash";
import {TypeChoose} from "~/utils/interfaces";

const props = defineProps({
  type: String,
  choose : [] as TypeChoose[]
})

const emits= defineEmits(['submit'])

const icon_show = ref(false)
const extra_box = ref(null)
const extra_choose = ref(null)
const top = ref()
const left = ref()
const bottom = ref()
const right = ref()
const extra_bottom = ref()
const extra_right = ref()

const choice = ref([] as boolean[])

const show = computed(()=>{
  let i: number
  for (i = 0;i < props.choose.length;i++){
    if(props.choose[i].choose)
      return true
  }
  return false
})

watch(props,(()=>{
  let i: number
  for (i = 0;i < choice.value.length;i++){
    choice.value[i] = props.choose[i].choose
  }
}))

const click = (index: number)=>{
  choice.value[index] = !choice.value[index]
}

const cancel = () => {
  let i: number
  for (i = 0;i < choice.value.length;i++){
    choice.value[i] = props.choose[i].choose
  }
  icon_show.value = false
  window.removeEventListener('mousemove',throttledHandle)
}

const submit = () => {
  emits('submit', props.type, choice.value)
  icon_show.value = false
  window.removeEventListener('mousemove',throttledHandle)
}

const enter = () => {
  icon_show.value = true
  setTimeout(()=>{
    top.value = Math.floor(extra_box.value.getBoundingClientRect().top)
    left.value = Math.floor(extra_box.value.getBoundingClientRect().left)
    bottom.value = Math.floor(extra_box.value.getBoundingClientRect().bottom)
    right.value = Math.floor(extra_box.value.getBoundingClientRect().right)
    extra_bottom.value = Math.floor(extra_choose.value.getBoundingClientRect().bottom)
    extra_right.value = Math.floor(extra_choose.value.getBoundingClientRect().right)
    window.addEventListener('mousemove', throttledHandle)
  },1)
}

const mouseHandle = (event : MouseEvent) => {
  const x = event.clientX
  const y = event.clientY
  if(!(y >= top.value && y <= bottom.value + 1 && x >= left.value && x <= right.value + 1
      || y >= bottom.value && y <= extra_bottom.value + 1  && x >= left.value && x <= extra_right.value + 1)){
    icon_show.value = false
    window.removeEventListener('mousemove',throttledHandle)
  }
}

const throttledHandle = throttle(mouseHandle, 100);

onMounted(()=>{
  let i:number
  for(i = 0;i < props.choose.length;i++)
    choice.value.push(false)
})
</script>

<template>
  <div class="extra_container" @mouseenter="enter" ref="extra_box">
    <div class="extra_left" :class="{extra_left_active: icon_show || show}">
      {{type}}
    </div>
    <div class="extra_right">
      <el-icon v-if="icon_show"><CaretTop /></el-icon>
      <el-icon v-if="!icon_show"><CaretBottom /></el-icon>
    </div>
    <div class="extra_choose" v-if="icon_show" ref="extra_choose">
      <div class="extra_choose_up">
        <template v-for="(t, index) in props.choose">
          <div class="extra_choose_main"  @click="click(index)">
            <div class="extra_choose_click" :class="{extra_choose_click_active: choice[index]}">
              <el-icon v-if="choice[index]"><Select /></el-icon>
            </div>
            <div style="margin-left: 5px">
              {{t.type}}
            </div>
          </div>
        </template>
      </div>
      <div class="extra_choose_down">
        <div class="extra_choose_button certain_button" @click="submit">确定</div>
        <div class="extra_choose_button cancel_button" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes myFirst
{
  0% {
    top: 25px;
    opacity: 0;
  }
  100% {
    top: 30px;
    opacity: 1;
  }
}

.extra_container{
  position: relative;
  display: flex;
  margin: 4px 12px 4px 0;
  padding: 0 5px;
  font-size: 11px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  background: white;
}

.extra_left{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
}

.extra_left_active{
  color: #f2711c;
}

.extra_right{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}

.extra_choose{
  z-index: 10;
  position: absolute;
  width: 400px;
  background: white;
  top: 30px;
  left: 0;
  border: 1px solid rgba(128, 128, 128, 0.2);
  animation: myFirst 0.3s;
  letter-spacing: 0.5px;
  padding-top: 5px;
}
.extra_choose_up{
  display: flex;
  flex-wrap: wrap;
  padding: 0 0 0 15px;
  margin-bottom: 15px;
}
.extra_choose_down{
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f5f5;
}
.extra_choose_main{
  display: flex;
  width: 26.33%;
  margin-right: 7%;
  cursor: pointer;
  margin-top: 10px;
}

.extra_choose_main:hover .extra_choose_click{
  border: 1px solid #f2711c;
}

.extra_choose_click{
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 1px;
  width: 12px;
  height: 12px;
  background: white;
}

.extra_choose_click_active{
  color: white;
  background: #f2711c;
}

.extra_choose_button{
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 6px 8px;
  padding: 4px 12px;
  border-radius: 1px;
  font-size: 10px;
  cursor: pointer;
}

.certain_button{
  box-sizing: border-box;
  background: #f2711c;
  color: white;
}

.certain_button:hover{
  background: rgba(242, 113, 28, 0.7);
}

.cancel_button{
  box-sizing: border-box;
  background: white;
  border: 1px solid rgba(128, 128, 128, 0.2);
  color: black;
}

.cancel_button:hover{
  color: rgba(242, 113, 28, 0.7);
  border: 1px solid rgba(242, 113, 28, 0.7);
}
</style>