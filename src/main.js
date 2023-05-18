import "bootstrap/dist/css/bootstrap.css"
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { vInfiniteScroll } from '@vueuse/components'

createApp(App).use(router).use(vInfiniteScroll).mount('#app')
import "bootstrap/dist/js/bootstrap.js"
