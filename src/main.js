import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './common/bus'

const app = createApp(App)

app.config.globalProperties.$bus = Bus

app.use(store).use(router).mount('#app')

