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
            :to="{ name: 'Category', params: { category: category.slug} }"
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
      <h2>Programas recentes</h2>
      <ul>
        <li v-wave>
          <router-link to="/teste">
            <img
              src="https://picsum.photos/380"
              alt="Miniatura do programa"
            >
            <p>Flow Podcast</p>
          </router-link>
        </li>
      </ul>
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
          this.categoryError = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
        }
      })
  }
}
</script>
