import { defineStore } from "pinia";
import { request } from "~/utils/request";
import {PICTURE_ADDR} from "~/config";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            id: -1,
            phone: '',
            username: '南大混饭人',
            picture: PICTURE_ADDR + '/profile/0.jpg',
        }
    },

    actions: {
        fetch() {
            request({
                url: '/user',
                method: 'GET'
            }).then((res) => {
                this.id = res.data.id
                this.phone = res.data.phone
                this.username = res.data.username
                this.phone = res.data.picture
            }).catch((err) => {
                console.log(err)
            })
        }
    }

})