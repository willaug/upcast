<template>
  <div class="container content">
    <div class="main-container">
      <h1 class="title">
        Explorar
      </h1>
      <ul
        v-if="categories.length > 0"
        class="pb-4 thumbnail-list"
      >
        <li
          v-for="(category, index) in categories"
          :key="index"
          v-wave
          class="thumbnail"
        >
          <router-link
            :to="{ name: 'Category', params: { category: category.slug } }"
            class="icon"
          >
            <img
              :src="$api + category.icon"
              :alt="category.name"
            >
            <p>{{ category.name }}</p>
          </router-link>
        </li>
      </ul>
      <div
        v-else
        class="one-error"
      >
        {{ categoryError }}
      </div>
      <template v-if="showError === null || showError === undefined">
        <template v-if="shows.length > 0">
          <h2>Programas recentes</h2>
          <ul>
            <li
              v-for="(show, index) in shows.slice(0, 5)"
              :key="index"
              v-wave
            >
              <router-link :to="{ name: 'Show', params: { show: show.uid } }">
                <div class="photo">
                  <img
                    :src="$api + show.url_photo"
                    :class="{ photoIcon: show.url_photo.includes('.svg') }"
                    :alt="show.title"
                  >
                </div>
                <p>{{ show.title }}</p>
              </router-link>
            </li>
          </ul>
        </template>
        <template v-else>
          <div class="one-error message">
            Ainda não há programas disponíveis.
          </div>
        </template>
      </template>
      <template v-else>
        <div class="one-error">
          {{ showError }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Explorar novos conteúdos • Upcast'
  },
  data () {
    return {
      categories: [],
      shows: [],
      showError: null,
      categoryError: null
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
          this.categoryError = 'Ocorreu um erro de conexão e não conseguimos responder a solicitação de categorias. Tente novamente mais tarde!'
        }
      })

    this.$axios('/shows')
      .then(result => {
        this.shows = result.data.response
      })
      .catch(err => {
        if (err.response) {
          this.showError = err.response.data
        } else {
          this.showError = 'Ocorreu um erro de conexão e não conseguimos responder a solicitação de novos programas. Tente novamente mais tarde!'
        }
      })
  }
}
</script>
