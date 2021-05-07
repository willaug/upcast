import Vue from 'vue'
import Vuex from 'vuex'

import account from './modules/account'
import audio from './modules/audio'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { account, audio }
})
