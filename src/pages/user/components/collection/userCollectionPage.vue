<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {CarCollection} from "~/utils/interfaces";
import UserCollection from "~/pages/user/components/collection/userCollection.vue";
import UserCollectionBottom from "~/pages/user/components/collection/userCollectionBottom.vue";
import {useCollectionStore} from "~/stores/collection";

const collection_list = ref([] as CarCollection[][])
const collections = useCollectionStore()

watch(collections,()=>{
  changeCollection()
})

onMounted(()=>{
  changeCollection()
})

const changeCollection = () =>{
  collection_list.value = []
  let i : number;
  for(i = 0;i < 4;i++){
    let collection: CarCollection[] = []
    let j : number
    for (j = 0;j < 4;j++) {
      if(4 * i + j < collections.collections.length){
        let info: CarCollection = collections.collections[4 * i + j]
        collection.push(info)
      }
    }
    if(collection.length != 0)
        collection_list.value.push(collection)
  }
}
</script>

<template>
  <div>
    <template v-for="collection_line in collection_list">
      <div class="collection_line">
        <template v-for="collection in collection_line">
            <UserCollection :id="collection.id" :picture-path="collection.picturePath" :price="collection.price" :name="collection.name"/>
        </template>
      </div>
    </template>
  </div>
  <UserCollectionBottom />
</template>

<style scoped>
.collection_line{
  display: flex;
  margin-bottom: 15px;
}
</style>