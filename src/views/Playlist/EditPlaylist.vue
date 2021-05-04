<template>
  <div class="container content">
    <template v-if="playlistFound === null || playlistFound === undefined">
      <div class="one-error message">
        {{ errorGetPlaylist }}
      </div>
    </template>
    <template v-else>
      <h1 class="title">
        Editar playlist
      </h1>
      <form class="edit-form">
        <label for="title">Título</label>
        <input
          id="title"
          v-model="playlistFound.title"
          type="text"
          placeholder="Alterar o título da playlist"
        >
        <button
          v-wave
          type="button"
          class="button-edit-form"
          @click="updatePlaylist"
        >
          Salvar
        </button>
        <transition
          name="fade"
        >
          <ul
            v-if="errors.length > 0"
            class="error-list"
          >
            <li
              v-for="(error, index) in errors"
              :key="index"
            >
              {{ error }}
            </li>
          </ul>
        </transition>
        <hr>
        <template v-if="playlistFound.episodes.length > 0">
          <div class="main-container">
            <ul>
              <li
                v-for="(episode, index) in playlistFound.episodes"
                :key="index"
                v-wave
              >
                <div class="playlist-item">
                  <p class="just-title episode-title">
                    <i class="fas fa-play" />
                    {{ episode.title }}
                  </p>
                  <button
                    type="button"
                    class="button-remove-item"
                  >
                    <i class="fas fa-times" />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <div class="one-error message">
            Ainda não há episódios nesta playlist.
          </div>
        </template>
        <button
          v-wave
          type="button"
          class="button-delete"
          @click="deletePlaylist"
        >
          Deletar playlist
        </button>
      </form>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    playlist: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      playlistFound: null,
      errorGetPlaylist: null,
      errorEpisodes: null,
      errors: []
    }
  },
  computed: {
    auth () {
      return this.$store.getters.getAuth
    }
  },
  created () {
    this.$axios(`/playlists/${this.playlist}`)
      .then(result => {
        this.playlistFound = result.data.response
        document.title = `${this.playlistFound.title} • ${this.playlistFound.author.username} • Upcast`
      })
      .catch(err => {
        if (err.response) {
          this.errorGetPlaylist = err.response.data
        } else {
          this.errorGetPlaylist = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
        }
      })
  },
  methods: {
    updatePlaylist () {
      const { playlistFound, playlist, auth, $axios, $router } = this
      const data = { title: playlistFound.title }

      this.errors = []

      $axios.patch(`/playlists/${playlist}`, data, auth)
        .then(() => $router.push({ name: 'Playlist', params: { playlist } }))
        .catch(err => {
          if (err.response) {
            const response = err.response.data
            const responseIsArray = Array.isArray(response)

            if (responseIsArray) {
              this.errors = response
            } else {
              this.errors.push(response)
            }
          } else {
            const message = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
            this.errors.push(message)
          }
        })
    },
    deletePlaylist () {
      const { playlist, auth, $axios, $router } = this

      $axios.delete(`/playlists/${playlist}`, auth)
        .then(() => $router.push({ name: 'User', params: { user: this.$getUid() } }))
        .catch(err => {
          this.playlistFound = null
          if (err.response) {
            this.errorGetPlaylist = err.response.data
          } else {
            this.errorGetPlaylist = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/edit-form.scss';
</style>
