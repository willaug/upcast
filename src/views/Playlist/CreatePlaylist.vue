<template>
  <div class="container content">
    <h1 class="title">
      Criar playlist
    </h1>
    <form class="edit-form">
      <label for="title">Título</label>
      <input
        id="title"
        v-model="title"
        type="text"
        placeholder="Adicione um título para a playlist"
      >
      <button
        v-wave
        type="button"
        class="button-edit-form"
        @click="sendPlaylist"
      >
        Criar
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
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Criar playlist • Upcast'
  },
  data () {
    return {
      title: null,
      errors: []
    }
  },
  computed: {
    auth () {
      return this.$store.getters.getAuth
    }
  },
  methods: {
    sendPlaylist () {
      const { title, auth, $axios, $router } = this
      const data = { title }

      $axios.post('/playlists', data, auth)
        .then(() => {
          $router.push({ name: 'User', params: { user: this.$getUid() } })
        })
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/edit-form.scss';
</style>
