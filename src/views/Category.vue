<template>
  <div class="container content">
    <div class="main-container">
      <template v-if="categoryName === null || categoryName === undefined">
        <div class="one-error">
          {{ error }}
        </div>
      </template>
      <template v-else>
        <h1 class="title">
          {{ categoryName }}
        </h1>
        <template v-if="shows.length > 0">
          <h2>Conheça programas</h2>
          <ul>
            <li
              v-for="(show, index) in shows"
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
            Ainda não há programas nesta categoria.
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Categoria X • Upcast'
  },
  props: {
    category: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      categoryName: null,
      error: null,
      shows: []
    }
  },
  async created () {
    const { category, $axios } = this
    this.error = null

    try {
      const categoryFound = await $axios(`categories/${category}`)
      this.categoryName = categoryFound.data.response.name

      const showsFound = await $axios(`categories/${category}/shows`)
      this.shows = showsFound.data.response
    } catch (err) {
      if (err.response) {
        this.error = err.response.data
      } else {
        this.error = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
      }
    }
  }
}
</script>
