export default {
  state: {
    audio: {
      title: null,
      url: null
    }
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
