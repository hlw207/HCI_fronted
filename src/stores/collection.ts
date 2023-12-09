import { defineStore } from "pinia";
import {CarCollection} from "~/utils/interfaces";
import {request} from "~/utils/request";
import {useUserStore} from "~/stores/user";

export const useCollectionStore = defineStore('collection', {
    state: () => {
        return {
            total_num : 234,
            page : 0,
            carCollections: [] as CarCollection[][]
        }
    },

    actions: {
        fetch(page: number) {
            request({
                url: '/collection',
                method: 'GET',
                params: {
                    userId: useUserStore().id
                }
            }).then((res)=>{
                this.carCollections = []
                this.total_num = res.data.length;
                if(12 * page >= this.total_num) {
                    if(page != 0)
                        this.fetch(this.page - 1)
                    return
                }
                this.page = page
                let i: number
                for (i = 0;i < 3;i++){
                    let j: number
                    let collection = [] as CarCollection[]
                    for (j = 0;j < 4;j++){
                        if(12 * page + i * 4 + j < this.total_num){
                            collection.push(res.data[12 * page + i * 4 + j])
                        }
                    }
                    if(collection.length != 0)
                        this.carCollections.push(collection)
                }
            })
        },
        change(total_page:number){
            this.total_num = total_page
        }
    }

})