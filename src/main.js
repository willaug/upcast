import Vue from 'vue'
import App from './App.vue'
import router from './routes'
// import store from './store'
import './plugins/axios'
import './plugins/meta'
import './plugins/wave'
import './styles/template.scss'

Vue.config.productionTip = false
Vue.prototype.$api = process.env.VUE_APP_API_URL

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount('#app')
