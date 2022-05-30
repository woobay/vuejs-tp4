import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "../node_modules/bootstrap/dist/css/bootstrap.css"

const app = createApp(App)

app.use(router)

app.mount('#app')

import "../node_modules/bootstrap/dist/js/bootstrap.js"