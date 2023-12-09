import {createApp} from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import "~/styles/index.scss";
import "uno.css";
import App from './App.vue'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from "virtual:generated-layouts"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import detail from "~/pages/detail/index.vue";

generatedRoutes.push({ path: '/detail/:id', component: detail });

const router = createRouter({
    history: createWebHistory(),
    routes:setupLayouts(generatedRoutes)
})


const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
