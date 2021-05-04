import Vue from 'vue'
import moment from 'moment'

Vue.filter('DATE', item => {
  return moment(item).format('DD/MM/YYYY')
})
