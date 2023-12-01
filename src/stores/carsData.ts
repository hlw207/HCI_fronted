import {defineStore} from "pinia";
import {request} from "~/utils/request";

export const useCarsData = defineStore("carsData", {
    state: () => {
        return {
            brands: [] as String[],
            carTypes: [] as String[],
            prices: [] as String[]
        }
    },

    actions: {
        fetch() {
            this.brands = ['不限']
            this.carTypes = ['不限']
            this.prices = []
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
            this.prices.push("不限","3万以下","3-5万","5-8万","8-10万","10-15万","15-20万","20-30万","30万以上")
        },
        getCarTypes(brand: string){
            request({
                url: '/carTypes',
                method: 'GET',
                params:{
                    brand: brand
                },
            }).then((res) =>{
                this.carTypes = ['不限']
                let i: number
                for (i = 0;i < res.data.length;i++){
                    this.carTypes.push(res.data[i])
                }
            })
        }
    }
})