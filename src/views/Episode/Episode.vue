<template>
  <div class="full-container">
    <div class="container content">
      <div class="main-container">
        <template v-if="episodeFound === null || episodeFound === undefined">
          <div class="one-error">
            {{ errorGetEpisode }}
          </div>
        </template>
        <template v-else>
          <h1 class="title">
            {{ episodeFound.title }}
          </h1>
          <p class="shows">
            <router-link :to="{ name: 'Show', params: { show: episodeFound.show.uid } }">
              {{ episodeFound.show.title }}
            </router-link>
            • {{ episodeFound.createdAt | DATE }} • {{ episodeFound.duration }}
          </p>
          <p class="about">
            {{ episodeFound.description || 'Sem descrição.' }}
          </p>
          <div class="line-actions">
            <router-link
              v-if="author"
              v-wave
              :to="{ name: 'EditEpisode', params: { episode } }"
              class="button-edit"
            >
              <i class="fas fa-pencil-alt" /> Editar
            </router-link>
            <button
              v-if="$getUid() !== null && $getUid() !== undefined && playlists.length > 0"
              v-wave
              class="button-edit"
              :class="{ 'ml-1': author === true }"
              @click="showPlaylists = true"
            >
              <i class="fas fa-share" /> Salvar na playlist
            </button>
          </div>
          <div
            v-if="errorAddEpisode !== null"
            class="one-error"
          >
            {{ errorAddEpisode }}
          </div>
          <button
            v-if="episodeFound.url_audio !== null"
            v-wave
            type="button"
            class="button-play"
            @click="playAudio"
          >
            <i class="fas fa-play" />
            Reproduzir
          </button>
          <div
            v-else
            class="one-error message"
          >
            O episódio está em fase de processamento. Aguarde.
          </div>
          <transition name="fade">
            <div
              v-if="showPlaylists"
              class="component"
            >
              <div
                v-for="(playlist, index) in playlists"
                :key="index"
                v-wave
                class="playlist-item"
                @click="showPlaylists = false, addEpisodeInPlaylist(playlist.uid)"
              >
                <i class="fas fa-plus" /> {{ playlist.title }}
              </div>
            </div>
          </transition>
        </template>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    episode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      episodeFound: null,
      errorGetEpisode: null,
      errorAddEpisode: null,
      showPlaylists: false,
      playlists: [],
      author: false
    }
  },
  computed: {
    auth () {
      return this.$store.getters.getAuth
    }
  },
  async created () {
    try {
      const result = await this.$axios(`/episodes/${this.episode}`)
      const show = await this.$axios(`/shows/${result.data.response.show.uid}`)

      this.episodeFound = result.data.response
      document.title = `${this.episodeFound.title} • ${this.episodeFound.show.title} • Upcast`

      if (show.data.response.author.uid === this.$getUid()) {
        this.author = true
      } else {
        this.author = false
      }

      if (this.$getUid() !== null && this.$getUid() !== undefined) {
        const res = await this.$axios(`/users/${this.$getUid()}/playlists`)
        this.playlists = res.data.response
      }
    } catch (err) {
      if (err.response) {
        this.errorGetEpisode = err.response.data
      } else {
        this.errorGetEpisode = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
      }
    }
  },
  methods: {
    addEpisodeInPlaylist (playlist) {
      const { episode, auth, $axios } = this
      const data = { episode }

      this.errorAddEpisode = null

      $axios.post(`/playlists/${playlist}/item`, data, auth)
        .then(() => {
          this.showPlaylists = false
        })
        .catch(err => {
          if (err.response) {
            this.errorAddEpisode = err.response.data
          } else {
            this.errorAddEpisode = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
          }
        })
    },
    playAudio () {
      const url = this.$api + this.episodeFound.url_audio
      const title = this.episodeFound.title
      const audio = { title, url }

      this.$store.commit('listenAudio', audio)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/episode.scss';
</style>
