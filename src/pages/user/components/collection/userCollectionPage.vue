<script setup lang="ts">
import UserCollection from "~/pages/user/components/collection/userCollection.vue";
import UserCollectionBottom from "~/pages/user/components/collection/userCollectionBottom.vue";
import {useCollectionStore} from "~/stores/collection";

const collections = useCollectionStore()

</script>

<template>
  <div>
    <div class="collection_top">
      我的收藏：
    </div>
    <template v-for="collection_line in collections.carCollections">
      <div class="collection_line">
        <template v-for="collection in collection_line">
            <UserCollection :id="collection.id" :picture-path="collection.picturePath" :price="collection.price" :name="collection.name" :time="collection.time" :mileage="collection.mileage" :source="collection.source"/>
        </template>
      </div>
    </template>
  </div>
  <UserCollectionBottom />
</template>

<style scoped>
.collection_top{
  color: #f2711c;
  font-size: 15px;
  padding-left: 5px;
  border-left: 3px solid #f2711c;
  margin-left: 10px;
  margin-bottom: 10px;
}

.collection_line{
  display: flex;
  margin-bottom: 15px;
  padding: 0 10px;
}
</style>