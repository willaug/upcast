<template>
  <div class="full-container">
    <div class="container content">
      <template v-if="playlistFound === null || playlistFound === undefined">
        <div class="one-error">
          {{ errorGetPlaylist }}
        </div>
      </template>
      <template v-else>
        <h1 class="title mb-1">
          {{ playlistFound.title }}
        </h1>
        <p class="created">
          Criado em {{ playlistFound.createdAt | DATE }} • Alterado em {{ playlistFound.updatedAt | DATE }}
        </p>
        <router-link
          v-if="playlistFound.author.uid === $getUid()"
          v-wave
          :to="{ name: 'EditPlaylist', params: { playlist } }"
          class="button-edit"
        >
          <i class="fas fa-pencil-alt" /> Editar
        </router-link>
        <template v-if="playlistFound.episodes.length > 0">
          <div class="main-container">
            <ul
              v-for="(episode, index) in playlistFound.episodes"
              :key="index"
            >
              <li v-wave>
                <router-link :to="{ name: 'Episode', params: { episode: episode.uid } }">
                  <p class="just-title episode-title">
                    <i class="fas fa-play" />
                    {{ episode.title }}
                  </p>
                  <p class="time">
                    {{ episode.duration }}
                  </p>
                </router-link>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <div class="one-error message">
            Ainda não há episódios nesta playlist.
          </div>
        </template>
      </template>
    </div>
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
      errorGetPlaylist: null
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
          this.errorGetEpisode = err.response.data
        } else {
          this.errorGetEpisode = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
        }
      })
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/show.scss';
</style>
