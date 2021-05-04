<template>
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
          {{ episodeFound.description || 'Sem descrição' }}
        </p>
        <router-link
          v-if="author"
          v-wave
          :to="{ name: 'EditEpisode', params: { episode } }"
          class="button-edit"
        >
          <i class="fas fa-pencil-alt" /> Editar
        </router-link>
        <button
          v-if="episodeFound.url_audio !== null"
          v-wave
          type="button"
          class="button-play"
        >
          <i class="fas fa-play" />
        </button>
        <div
          v-else
          class="one-error message"
        >
          O episódio está em fase de processamento. Aguarde.
        </div>
      </template>
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
    } catch (err) {
      if (err.response) {
        this.errorGetEpisode = err.response.data
      } else {
        this.errorGetEpisode = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/episode.scss';
</style>
