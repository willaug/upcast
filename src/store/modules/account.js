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
    }
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
    async TokenIsValid () {
      const token = localStorage.getItem('ACCESS_TOKEN')
      const auth = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      try {
        await Vue.prototype.$axios('/account', auth)
        return true
      } catch {
        return false
      }
    }
  },
  getters: {
    getAccount (state) {
      return state.accountData
    }
  }
}
