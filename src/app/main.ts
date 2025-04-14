import '../assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/app/App.vue'
import { setupRouter } from '@/app/router'


const app = createApp(App)

app.use(createPinia())

setupRouter(app)

app.mount('#app')
