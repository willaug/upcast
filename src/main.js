import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './App.vue'
// import router from './router'
import store from './store'
import './plugins/axios'

Vue.config.productionTip = false
Vue.prototype.$api = process.env.VUE_APP_API_URL

Vue.use(VueMeta)

new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount('#app')
