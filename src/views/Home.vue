<template>
  <div class="full-container">
    <div class="container content">
      <div class="gradient">
        Ouça o quanto quiser!
      </div>
      <div class="main-container">
        <template v-if="showError === null || showError === undefined">
          <template v-if="shows.length > 0">
            <h2>Conheça</h2>
            <ul>
              <li
                v-for="(show, index) in shows.slice(0, 10)"
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
      <a
        class="credits"
        href="https://github.com/willaug"
        target="_blank"
      >
        Feito com <strong><i class="fas fa-heart" /></strong> por William Augusto
      </a>
    </div>
  </div>
</template>

<script>

export default {
  metaInfo: {
    title: 'Ouça o quanto quiser • Upcast'
  },
  data () {
    return {
      shows: [],
      showError: null
    }
  },
  created () {
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

<style lang="scss" scoped>
@import '../styles/variables.scss';

  .credits {
    font-size: 15px;
    margin: 70px 0 30px 0;
    text-align: center;
    color: $gray-color;
    text-decoration: none;
    display: block;
    font-weight: 500;
  }

  strong {
    color: $primary-color;
  }

  @media (min-width: 1024px) {
    .credits {
      font-size: 16px;
      margin: 80px 0 20px 0;
    }
  }
</style>
