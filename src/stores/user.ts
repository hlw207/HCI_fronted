import { defineStore } from "pinia";
import { request } from "~/utils/request";
import {PICTURE_ADDR} from "~/config";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            id: -1,
            phone: '15971989001',
            username: 'hlw',
            nickname: '南大混饭人',
            password: '123',
            profile: PICTURE_ADDR + '/profile/0.jpg',
            autoGraph: '123'
        }
    },

    actions: {
        fetch() {
            request({
                url: '/user',
                method: 'GET',
                params: {
                    username: localStorage.getItem("username")
                }
            }).then((res) => {
                this.id = res.data.id
                this.username = res.data.username
                this.phone = res.data.phone
                this.profile = PICTURE_ADDR + res.data.profile
                this.autoGraph = res.data.autoGraph
            }).catch((err) => {
                console.log(err)
            })
        }
    }

})