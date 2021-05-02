import Vue from 'vue'
import moment from 'moment'

Vue.filter('DATETIME', item => {
  return moment(item).format('DD/MM/YYYY [às] HH:mm')
})
