<template>
  <div class="full-container">
    <div class="container content">
      <h1 class="title">
        Criar programa
      </h1>
      <template v-if="categoryError !== null && categoryError !== undefined">
        <div class="one-error">
          {{ categoryError }}
        </div>
      </template>
      <template v-else>
        <form class="edit-form">
          <div class="label-input">
            <label for="title">Título</label>
            <input
              id="title"
              v-model="title"
              type="text"
              placeholder="Adicione um título para o programa"
            >
          </div>
          <div class="label-input">
            <label for="description">Descrição</label>
            <textarea
              id="description"
              v-model="description"
              placeholder="Digite a descrição (Opcional)"
            />
          </div>
          <div class="label-input">
            <label for="category">Categoria</label>
            <div class="select">
              <select
                id="category"
                v-model="selectedCategory"
              >
                <option
                  disabled
                  value=""
                >
                  Escolha a categoria
                </option>
                <option
                  v-for="(category, index) in categories"
                  :key="index"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>
          <button
            v-wave
            type="button"
            class="button-edit-form"
            @click="sendShow"
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
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Criar programa • Upcast'
  },
  data () {
    return {
      categories: [],
      categoryError: null,
      errors: [],
      title: null,
      selectedCategory: '',
      description: null
    }
  },
  computed: {
    auth () {
      return this.$store.getters.getAuth
    }
  },
  created () {
    this.$axios('/categories')
      .then(result => {
        this.categories = result.data.response
      })
      .catch(err => {
        if (err.response) {
          this.categoryError = err.response.data
        } else {
          this.categoryError = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
        }
      })
  },
  methods: {
    sendShow () {
      const { title, selectedCategory, description, $axios, $router, auth } = this
      const data = { title, category: selectedCategory }

      if (description !== null && description !== undefined) {
        data.description = description
      }

      $axios.post('/shows', data, auth)
        .then(() => $router.push({ name: 'User', params: { user: this.$store.getters.getAccount.uid } }))
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/edit-form.scss';
</style>
