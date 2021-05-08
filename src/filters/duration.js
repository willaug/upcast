import Vue from 'vue'

Vue.filter('DURATION', time => {
  const secondsToInt = Math.round(time)
  const hours = Math.floor(secondsToInt / 3600)
  const minutes = Math.floor((secondsToInt - (hours * 3600)) / 60)
  const seconds = secondsToInt - (hours * 3600) - (minutes * 60)

  const result = `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`

  return result
})
