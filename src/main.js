import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification';
import "vue-toastification/dist/index.css";

import App from './App.vue'
import router from './router'

const app = createApp(App)
const toastOptions = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
    position: "bottom-right",
    timeout: 4000,
    pauseOnHover: false,
    draggable: false,
    closeOnClick: true,
    showCloseButtonOnHover: true,
}

app.use(createPinia())
app.use(Toast, toastOptions);
app.use(router)

app.mount('#app')
