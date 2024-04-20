import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OpenF1CarService } from './services/OpenF1CarService'
import { OpenF1DriverService } from './services/OpenF1DriverService'
import { OpenF1SessionService } from './services/OpenF1SessionService'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.provide('openF1CarService', new OpenF1CarService())
app.provide('openF1DriverService', new OpenF1DriverService())
app.provide('openF1SessionService', new OpenF1SessionService())

app.use(createPinia())
app.use(router)

app.mount('#app')
