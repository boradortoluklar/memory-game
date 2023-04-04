import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { settings } from './utils/toast-settings'
Vue.config.productionTip = false
Vue.use(Toast, settings)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
