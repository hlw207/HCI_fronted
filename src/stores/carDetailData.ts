import {defineStore} from "pinia";
import {request} from "~/utils/request";
import {PICTURE_ADDR} from "~/config";

export const useCarDetailData = defineStore("carDetailData", {
    state: () => {
        return {
            id: -1,
            surface: [] as String[],
            trim: [] as String[],
            engine: [] as String[]
        }
    },

    actions: {
        fetch(id: number) {
            // const url = PICTURE_ADDR + 'car/' + id.toString() + '/'
            const url = PICTURE_ADDR + 'car/' + '63' + '/'
            request({
                    url: `/carDetail/63`,
                    method: 'GET',
            }).then((res) => {
                console.log(res.data)
                this.id = res.data.id
                this.surface = res.data.surface.map(item => url + '0/' + item)
                this.trim = res.data.trim.map(item => url + '1/' + item)
                this.engine = res.data.engine.map(item => url + '2/' + item)
            }).catch((err) => {
                console.log("获取错误")
            })
        },
    }
})