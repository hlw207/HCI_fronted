import {defineStore} from "pinia";
import {CarStruct} from "~/utils/interfaces";
import {request} from "~/utils/request";
import {useUserStore} from "~/stores/user";


export const useBuyBottomStore = defineStore('buy', {
    state: () => {
        return {
            total_num : 0,
            page : 0,
            cars : [] as CarStruct[][],
            carData: [] as CarStruct[],
            carRequest:  {
                search: "",
                brand: "不限",
                carAge: "",
                carColor: "",
                carDetailType: "",
                carDistance: "",
                carGear: "",
                carLevel: "",
                carPollution: "",
                carType: "不限",
                price: "不限"
            }
        }
    },

    actions: {
        fetch(page: number) {
            request({
                url: '/cars',
                method: 'POST',
                data: this.carRequest
            }).then((res) => {
                this.carData = res.data
                this.total_num = this.carData.length
                console.log(this.carData)
                this.cars = []
                if(32 * page >= this.total_num)
                    return
                this.page = page
                const startIndex = page * 32;
                const endIndex = Math.min(startIndex + 32, this.total_num);
                this.changeCollection(startIndex, endIndex)
            }).catch((err) => {
                console.log(err)
            })
        },
        changeCollection(startIndex: number, endIndex: number){
            this.cars = []
            let i : number;
            for(i = 0;i < 8;i++){
                let collection: CarStruct[] = []
                let j : number
                for (j = 0;j < 4;j++) {
                    if(4 * i + j + startIndex < endIndex){
                        let info: CarStruct = this.carData[4 * i + j + startIndex]
                        collection.push(info)
                    }
                }
                if(collection.length != 0)
                    this.cars.push(collection)
            }
        },
        change(total_page : number){
            this.page = total_page
        }
    }


})
