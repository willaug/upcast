import Vue from 'vue'
import jwt from 'jwt-decode'

Vue.use({
  install (Vue) {
    Vue.prototype.$getUid = () => {
      const token = localStorage.getItem('ACCESS_TOKEN')
      const decoded = jwt(token)

      return decoded.uid
    }
  }
})
