import {defineStore} from "pinia";
import {CarStruct} from "~/pages/buy/components/filterBar/carStruct";
import {carRequest} from "~/utils/interfaces";
import {request} from "~/utils/request";
import {ElMessage} from "element-plus";


export const useBuyBottomStore = defineStore('buy', {
    state: () => {
        return {
            total_num : 0,
            page : 0,
            cars : [] as CarStruct[],
            carData: [] as CarStruct[]
        }
    },

    actions: {
        getCars(carRequest: carRequest){
            request({
                url: '/cars',
                method: 'POST',
                data: carRequest
            }).then((res) => {
                this.carData = res.data
                this.total_num = this.carData.length
                console.log(this.carData)
            }).catch((err) => {
                console.log(err)
            })
        },
        fetch(page: number) {
            const carRequest: carRequest = {
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
            this.getCars(carRequest)
            this.cars = []
            if(32 * page >= this.total_num)
                return
            this.page = page
            const startIndex = page * 32;
            const endIndex = Math.min(startIndex + 32, this.total_num);
            for (let i = startIndex; i < endIndex; i++) {
                const car = this.carData[i];
                const info: CarStruct = {
                    id: car.id,
                    image: car.image,
                    name: car.name,
                    price: car.price,
                    color: car.color,
                    time: car.time,
                    mileage: car.mileage,
                    source: car.source,
                    shine: false,
                };
                this.cars.push(info);
            }
        },
        change(total_page : number){
            this.total_num = total_page
        }
    }


})
