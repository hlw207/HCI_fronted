<script setup lang="ts">
import {onMounted, reactive, ref, watch} from "vue";
import {useCarsShow} from "~/stores/carsShow";
import {ArrowRight} from "@element-plus/icons-vue";

const props = defineProps({
  top: Number,
  left: Number,
  isShow: Boolean
})

const emits = defineEmits(['disShow', 'submit'])

const carsShow = useCarsShow()
const show = ref()

const top = props.top
const left = props.left

const click_top = ref()
const click_left = ref()
const click_bottom = ref()
const click_right = ref()

const first = ref('Hot')
const second = ref('')
const third = ref('')

const exist = (num : number)=>{
  return num != 5 && num != 9 && num != 21 && num != 22
}

const choose = (data : string) =>{
  third.value = data
  emits('submit', second.value + '-' + third.value)
}

watch(first,(()=>{
  if(first.value == 'Hot') {
    carsShow.fetch()
  }else
    carsShow.getById(first.value.charCodeAt(0) - 65)
  second.value = third.value = ''
}))

watch(second,(()=>{
  if(second.value != '')
    carsShow.getCarTypes(second.value)
  else
    carsShow.carTypes = []
  third.value = ''
}))

watch(props,(()=>{
  if(props.isShow) {
    setTimeout(() => {
      window.addEventListener('click', mouseHandle)
    }, 100)
  }else if(!props.isShow){
    window.removeEventListener('click',mouseHandle)
    first.value = 'Hot'
    second.value = third.value = ''


  }
}))

const mouseHandle = (event : MouseEvent) => {
  if(props.isShow) {
    click_top.value = Math.floor(show.value.getBoundingClientRect().top)
    click_left.value = Math.floor(show.value.getBoundingClientRect().left)
    click_bottom.value = Math.floor(show.value.getBoundingClientRect().bottom)
    click_right.value = Math.floor(show.value.getBoundingClientRect().right)
    const x = event.clientX
    const y = event.clientY
    if (!(x >= click_left.value && x <= click_right.value + 1 && y >= click_top.value && y <= click_bottom.value + 1)) {
      window.removeEventListener('click', mouseHandle)
      emits('disShow')
    }
  }
}

onMounted(()=>{
  carsShow.fetch()
})
</script>

<template>
  <div class="container" v-if="props.isShow">
    <div class="container_main" ref="show">
      <div class="left_container">
        <div class="left_container_box" :class="{left_container_box_active : first == 'Hot'}"
             @click="first='Hot'">Hot</div>
        <template v-for="index in 26">
          <div class="left_container_box" :class="{left_container_box_active : first == String.fromCharCode(index + 64)}"
                 @click="first=String.fromCharCode(index + 64)" v-if="exist(index)">
            {{String.fromCharCode(index + 64)}}
          </div>
        </template>
      </div>
      <div class="middle_container_box">
        <template v-for="data in carsShow.brands">
          <div class="middle_container_box_main" :class="{middle_container_box_main_active : second == data}" @click="second = data">
            <div style="margin-right: 40px">
               {{data}}
            </div>
            <div class="middle_container_box_icon">
              <el-icon><ArrowRight /></el-icon>
            </div>
          </div>
        </template>
      </div>
      <div class="right_container_box" v-if="carsShow.carTypes.length != 0">
        <template v-for="data in carsShow.carTypes">
          <div class="middle_container_box_main" :class="{middle_container_box_main_active : third == data}" @click="choose(data)">
            <div style="margin-right: 10px">
              {{data}}
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes myFirst
{
  0% {
    opacity: 0;
    top: 0;
  }
  100% {
    opacity: 1;
    top: v-bind(top + 'px');
  }
}

.container{
  z-index: 900;
  display: flex;
  position: absolute;
  top: v-bind(top + 'px');
  left: v-bind(left + 'px');
  height: 348px;
  width: 400px;
}

.container_main{
  display: flex;
  height: 348px;
  animation: myFirst 0.5s;
  background: white;
  border: 1px solid rgba(128, 128, 128, 0.25);
}


.left_container{
  padding: 3px 0;
  border-right: 1px solid rgba(128, 128, 128, 0.4);
}

.left_container_box{
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  padding: 1px 7px;
  cursor: pointer;
}

.left_container_box:hover{
  background: #fff7f0;
}

.left_container_box_active{
  color: #fc6c2b;
  background: #fafafa;
  pointer-events: none;
}

.middle_container_box{
  box-sizing: border-box;
  padding: 3px 0;
  border-right: 1px solid rgba(128, 128, 128, 0.4);
  overflow-y: auto;
  height: 100%;
}

.middle_container_box_main{
  position: relative;
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 5px 4px;
  color: rgba(0, 0, 0, 0.75);
  cursor: pointer;
}

.middle_container_box_main:hover{
  background: rgba(242, 113, 28, 0.1);
}

.middle_container_box_main_active{
  color: #f2711c;
  background: #fafafa;
  pointer-events: none;
}

.middle_container_box_icon{
  position: absolute;
  right: 5px;
  margin-top: 4px;
  font-size: 12px;
}

.right_container_box{
  box-sizing: border-box;
  padding: 3px 0;
  min-width: 100px;
  overflow-y: auto;
  height: 100%;
}

</style>