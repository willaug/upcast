<template>
  <div class="container content">
    <h1 class="title">
      Criar episódio
    </h1>
    <template v-if="showError !== null && showError !== undefined">
      <div class="one-error">
        {{ showError }}
      </div>
    </template>
    <template v-else>
      <form class="edit-form">
        <label for="title">Título</label>
        <input
          id="title"
          v-model="title"
          type="text"
          placeholder="Adicione um título para o episódio"
        >
        <label for="description">Descrição</label>
        <textarea
          id="description"
          v-model="description"
          placeholder="Digite a descrição (Opcional)"
        />
        <label for="show">Programa</label>
        <div class="select">
          <select
            id="show"
            v-model="selectedShow"
          >
            <option
              selected
              disabled
              value=""
            >
              Escolha o programa
            </option>
            <option
              v-for="(show, index) in shows"
              :key="index"
              :value="show.uid"
            >
              {{ show.title }}
            </option>
          </select>
        </div>
        <button
          v-wave
          type="button"
          class="button-edit-form"
          @click="sendEpisode"
        >
          Enviar
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
      </form>
    </template>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Criar episódio • Upcast'
  },
  data () {
    return {
      title: null,
      showError: null,
      description: null,
      shows: [],
      errors: [],
      selectedShow: ''
    }
  },
  computed: {
    account () {
      return this.$store.getters.getAccount
    },
    auth () {
      return this.$store.getters.getAuth
    }
  },
  created () {
    this.$axios(`/users/${this.account.uid}/shows`)
      .then(result => {
        this.shows = result.data.response
      })
      .catch(err => {
        if (err.response) {
          this.showError = err.response.data
        } else {
          this.showError = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
        }
      })
  },
  methods: {
    async sendEpisode () {
      const { title, selectedShow, description, auth, $axios, $router } = this
      const data = { title, show: selectedShow, description }

      this.errors = []

      try {
        await $axios.post('/episodes', data, auth)

        const showFound = await $axios(`/shows/${selectedShow}`)
        const episode = showFound.data.response.episodes[0].uid

        $router.push({ name: 'EditEpisode', params: { episode } })
      } catch (err) {
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/edit-form.scss';
</style>
