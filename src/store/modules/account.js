import Vue from 'vue'

export default {
  state: {
    accountData: {
      uid: null,
      username: null,
      email: null,
      photo: null,
      createdAt: null,
      updatedAt: null
    },
    auth: {}
  },
  mutations: {
    SignIn (state, token) {
      if (token !== undefined && token !== null) {
        const auth = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

        state.auth = auth

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
        }).catch(() => {
          state.accountData = {
            uid: null,
            username: null,
            email: null,
            photo: null,
            createdAt: null,
            updatedAt: null
          }
        })
      }
    }
  },
  actions: {
    SignInWithToken ({ commit }) {
      const token = localStorage.getItem('ACCESS_TOKEN')
      commit('SignIn', token)
    },
    TokenIsValid () {
      const token = localStorage.getItem('ACCESS_TOKEN')

      if (token !== undefined && token !== null) {
        const auth = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

        Vue.prototype.$axios('/account', auth)
          .then(() => true)
          .catch(() => false)
      } else {
        return false
      }
    }
  },
  getters: {
    getAccount (state) {
      return state.accountData
    },
    getAuth (state) {
      return state.auth
    }
  }
}
