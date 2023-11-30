import {defineStore} from "pinia";
import {CarStruct} from "~/pages/buy/components/filterBar/carStruct";
import carData from "~/pages/buy/components/bottomBar/carData";


export const buyBottomStore = defineStore('buy', {
    state: () => {
        return {
            total_num : 130,
            page : 0,
            cars : [] as CarStruct[],
        }
    },

    actions: {
        fetch(page: number) {
            this.cars = []
            if(12 * page >= this.total_num)
                return
            this.page = page
            const startIndex = page * 12;
            const endIndex = Math.min(startIndex + 12, carData.length);
            for (let i = startIndex; i < endIndex; i++) {
                const car = carData[i];
                const info: CarStruct = {
                    id: car.id + startIndex,
                    image: car.image,
                    name: car.brand + " " + car.series,
                    price: car.price,
                    color: car.color,
                    time: car.time,
                    mileage: car.mileage,
                    source: car.source,
                    shine: car.shine,
                };
                this.cars.push(info);
            }
        },
        change(total_page:number){
            this.total_num = total_page
        }
    }


})
