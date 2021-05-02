import Vue from 'vue'

export default {
  state: {
    auth: {},
    accountData: {}
  },
  mutations: {
    SignIn (state, token) {
      if (token !== undefined && token !== null) {
        const auth = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

        Vue.prototype.$axios('/account', auth).then(res => {
          const { uid, username, email, createdAt, updatedAt } = res.data.response
          const photo = res.data.response.url_photo

          state.accountData = {
            uid,
            username,
            email,
            photo,
            createdAt,
            updatedAt
          }

          state.auth = auth

          console.log(state.accountData)
        }).catch(err => {
          console.log(err)
        })
      } else {
        console.log('vc não tem token')
      }
    }
  },
  actions: {
    SignInWithToken ({ commit }, token) {
      commit('SignIn', token)
    }
  }
}
