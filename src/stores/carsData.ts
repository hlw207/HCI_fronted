import {defineStore} from "pinia";
import {request} from "~/utils/request";

export const useCarsData = defineStore("carsData", {
    state: () => {
        return {
            brands: ['不限','大众','丰田','奥迪','奔驰','宝马','本田','别克','日产','福特','雷克萨斯'
                ,'马自达','现代','路虎','沃尔沃','比亚迪','保时捷','英菲尼迪','雪佛兰'],
            carTypes: [] as String[],
            prices: [] as String[],
            wholeBrands: [] as String[][]
        }
    },

    actions: {
        fetch() {
            this.wholeBrands = []
            this.carTypes = ['不限']
            this.prices = []
            this.prices.push("不限","3万以下","3-5万","5-8万","8-10万","10-15万","15-20万","20-30万","30万以上")
            let id: number
            for (id = 0; id < 26;id++){
                let types = [] as String[]
                request({
                    url: `/brands/${id}`,
                    method: 'GET',
                }).then((res) => {
                    let i: number
                    for (i = 0;i < res.data.length;i++){
                        types.push(res.data[i])
                    }
                    this.wholeBrands.push(types)
                }).catch((err) => {
                    console.log("获取错误")
                })
            }
        },
        getCarTypes(brand: string){
            if(brand == '不限'){
                this.carTypes = ['不限']
                return
            }
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