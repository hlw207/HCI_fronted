import {defineStore} from "pinia";
import {CarStruct} from "~/pages/buy/components/filterBar/carStruct";
import carData from "~/pages/buy/components/bottomBar/carData";


export const useBuyBottomStore = defineStore('buy', {
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
            if(32 * page >= this.total_num)
                return
            this.page = page
            const startIndex = page * 32;
            const endIndex = Math.min(startIndex + 32, this.total_num);
            for (let i = startIndex; i < endIndex; i++) {
                const car = carData[i % 12];
                const info: CarStruct = {
                    id: i,
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
        change(total_page : number){
            this.total_num = total_page
        }
    }


})
