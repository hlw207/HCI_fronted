import {defineStore} from "pinia";
import {request} from "~/utils/request";

export const useCarsShow = defineStore("carsShow", {
    state: () => {
        return {
            brands: [] as String[],
            carTypes: [] as String[],
        }
    },

    actions: {
        fetch() {
            this.brands = []
            this.carTypes = []
            request({
                url: '/brands',
                method: 'GET',
            }).then((res) => {
                let i: number
                for (i = 0;i < res.data.length;i++){
                    this.brands.push(res.data[i])
                }
            }).catch((err) => {
                console.log("获取错误")
            })
        },

        getById(id: number) {
            this.brands = []
            this.carTypes = []
            request({
                url: `/brands/${id}`,
                method: 'GET',
            }).then((res) => {
                let i: number
                for (i = 0;i < res.data.length;i++){
                    this.brands.push(res.data[i])
                }
            }).catch((err) => {
                console.log("获取错误")
            })
        },

        getCarTypes(brand: string){
            this.carTypes = []
            request({
                url: '/carTypes',
                method: 'GET',
                params:{
                    brand: brand
                },
            }).then((res) =>{
                let i: number
                for (i = 0;i < res.data.length;i++){
                    this.carTypes.push(res.data[i])
                }
            })
        }
    }
})