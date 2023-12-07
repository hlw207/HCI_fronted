import { defineStore } from "pinia";
import { request } from "~/utils/request";
import {PICTURE_ADDR} from "~/config";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            id: -1,
            phone: '',
            username: '',
            profile: '',
            autoGraph: ''
        }
    },

    actions: {
        fetch() {
            request({
                url: '/user',
                method: 'GET',
                params: {
                    phone: localStorage.getItem("phone")
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
        },
        gainCode(){
            let code = '';
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                code += characters[randomIndex];
            }
            return code;
        }
    }

})