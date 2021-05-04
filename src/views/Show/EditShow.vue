<template>
  <div class="container content">
    <h1 class="title">
      Editar programa
    </h1>
    <template v-if="showFound === null || showFound === undefined">
      <div class="one-error">
        {{ errorGetShow }}
      </div>
    </template>
    <template v-else>
      <upload
        :photo-url="showFound.url_photo"
        :patch-url="`/shows/${show}`"
        :push="'Show'"
        :push-params="{ show: show }"
        :auth="auth"
      />
      <form class="edit-form">
        <label for="title">Título</label>
        <input
          id="title"
          v-model="showFound.title"
          type="text"
          placeholder="Editar o título"
        >
        <label for="description">Descrição</label>
        <textarea
          id="description"
          v-model="showFound.description"
          placeholder="Editar a descrição (Opcional)"
        />
        <label for="category">Categoria</label>
        <div class="select">
          <select
            id="category"
          >
            <option disabled>
              Editar categoria
            </option>
            <option
              v-for="(category, index) in categories"
              :key="index"
              :selected="category.name === showFound.category.name ? true : false"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <button
          v-wave
          type="button"
          class="button-edit-form"
          @click="updateShow"
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
          @click="deleteShow"
        >
          Deletar programa
        </button>
      </form>
    </template>
  </div>
</template>

<script>
import Upload from '../../components/PhotoUpload'

export default {
  components: { Upload },
  props: {
    show: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showFound: null,
      errorGetShow: null,
      categories: [],
      errors: []
    }
  },
  computed: {
    auth () {
      return this.$store.getters.getAuth
    }
  },
  async created () {
    try {
      const show = await this.$axios(`/shows/${this.show}`)
      const categories = await this.$axios('categories')

      this.showFound = show.data.response
      this.categories = categories.data.response
      document.title = `Editar ${this.showFound.title} • Upcast`
    } catch (err) {
      if (err.response) {
        this.errorGetShow = err.response.data
      } else {
        this.errorGetShow = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
      }
    }
  },
  methods: {
    updateShow () {
      const { show, auth, showFound, $axios, $router } = this
      const category = document.querySelector('#category').value
      const data = { title: showFound.title, description: showFound.description, category }

      this.errors = []

      $axios.patch(`shows/${show}`, data, auth)
        .then(() => $router.push({ name: 'Show', params: { show } }))
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
    deleteShow () {
      const { show, auth, $router, $axios } = this

      $axios.delete(`/shows/${show}`, auth)
        .then(() => $router.push({ name: 'Home' }))
        .catch(() => $router.push({ name: 'Show', params: { show } }))
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/edit-form.scss';
</style>
