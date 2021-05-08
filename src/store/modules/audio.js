export default {
  state: {
    audio: {}
  },
  mutations: {
    listenAudio (state, audio) {
      state.audio = audio
    }
  },
  getters: {
    getAudio (state) {
      return state.audio
    }
  }
}
