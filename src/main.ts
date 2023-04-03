import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
Vue.config.productionTip = false
const options = {
  position: 'top-right',
  timeout: 1000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: 'button',
  icon: true,
  rtl: false
}
Vue.use(Toast, options)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
