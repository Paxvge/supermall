import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Bus from './common/bus'
import lazyPlugin from "vue3-lazy";

const app = createApp(App)

// 事件总线
app.config.globalProperties.$bus = Bus

// 使用图片懒加载
app
  .use(store)
  .use(router)
  .use(lazyPlugin, {
  loading: require('@/assets/img/home/loading.png'), // 图片加载时默认图片
  error: require('@/assets/img/home/error.png')// 图片加载失败时默认图片
}).mount('#app')

