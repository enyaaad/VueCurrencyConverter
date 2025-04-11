import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { setupRouter } from '@/router/index.ts'
import App from './App.vue'


const app = createApp(App)

app.use(createPinia())

setupRouter(app)

app.mount('#app')
