import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'boxicons'
import '@/plugins/axios.js'


const app = createApp(App)

app.use(router)

app.mount('#app')
