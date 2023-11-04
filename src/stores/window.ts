import { defineStore } from "pinia";

export const useWindowStore = defineStore('window', {
    state: () => {
        return {
            height: window.innerHeight,
            width: window.innerWidth
        }
    }
})