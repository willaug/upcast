<template>
  <div class="full-container">
    <div class="container content">
      <h1 class="title">
        Editar episódio
      </h1>
      <template v-if="episodeFound === null || episodeFound === undefined">
        <div class="one-error">
          {{ errorGetEpisode }}
        </div>
      </template>
      <template v-else>
        <form class="edit-form">
          <div class="send-audio">
            <label
              v-wave
              class="upload"
              for="audio"
            >
              <i class="fas fa-cloud-upload-alt" />
              <p v-text="episodeFound.url_audio === null ? 'Adicionar áudio' : 'Alterar áudio'" />
            </label>
            <input
              id="audio"
              type="file"
              accept="audio/*"
              style="display: none"
              @change="sendAudio"
            >
            <div
              v-if="errorSendAudio !== null && errorSendAudio !== undefined"
              class="one-error"
            >
              {{ errorSendAudio }}
            </div>
          </div>
          <div class="label-input">
            <label for="title">Título</label>
            <input
              id="title"
              v-model="episodeFound.title"
              type="text"
              placeholder="Editar o título para o episódio"
            >
          </div>
          <div class="label-input">
            <label for="description">Descrição</label>
            <textarea
              id="description"
              v-model="episodeFound.description"
              placeholder="Editar a descrição (Opcional)"
            />
          </div>
          <div class="label-input">
            <label for="show">Programa</label>
            <div class="select">
              <select
                id="show"
              >
                <option disabled>
                  Editar programa
                </option>
                <option
                  v-for="(show, index) in shows"
                  :key="index"
                  :selected="show.title === episodeFound.show.title ? true : false"
                  :value="show.uid"
                >
                  {{ show.title }}
                </option>
              </select>
            </div>
          </div>
          <button
            v-wave
            type="button"
            class="button-edit-form"
            @click="updateEpisode"
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
          <button
            v-wave
            type="button"
            class="button-delete"
            @click="deleteEpisode"
          >
            Deletar episódio
          </button>
        </form>
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
      shows: [],
      errors: [],
      errorSendAudio: null
    }
  },
  computed: {
    auth () {
      return this.$store.getters.getAuth
    }
  },
  async created () {
    try {
      const episode = await this.$axios(`/episodes/${this.episode}`)
      const shows = await this.$axios(`/users/${this.$getUid()}/shows`)

      this.episodeFound = episode.data.response
      this.shows = shows.data.response
      document.title = `Editar ${this.episodeFound.title} • Upcast`
    } catch (err) {
      if (err.response) {
        this.errorGetEpisode = err.response.data
      } else {
        this.errorGetEpisode = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
      }
    }
  },
  methods: {
    updateEpisode () {
      const { episode, auth, episodeFound, $axios, $router } = this
      const show = document.querySelector('#show').value
      const data = { title: episodeFound.title, description: episodeFound.description, show }

      this.errors = []

      $axios.patch(`/episodes/${episode}`, data, auth)
        .then(() => $router.push({ name: 'Episode', params: { episode } }))
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

          window.scrollTo(0, document.body.scrollHeight)
        })
    },
    sendAudio (event) {
      const { episode, auth, $axios, $router } = this
      const item = event.target.files[0]
      const formData = new FormData()
      const upload = {
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: auth.headers.Authorization
        }
      }

      formData.append('audio', item)

      this.errorSendAudio = null

      $axios.patch(`/episodes/${episode}`, formData, upload)
        .then(() => $router.push({ name: 'Episode', params: { episode } }))
        .catch(err => {
          if (err.response) {
            const response = err.response.data

            this.errorSendAudio = response
          } else {
            this.errorSendAudio = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
          }
        })
    },
    deleteEpisode () {
      const { episodeFound, episode, auth, $router, $axios } = this

      $axios.delete(`/episodes/${episode}`, auth)
        .then(() => $router.push({ name: 'Show', params: { show: episodeFound.show.uid } }))
        .catch(() => $router.push({ name: 'Episode', params: { episode } }))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/edit-form.scss';
</style>
