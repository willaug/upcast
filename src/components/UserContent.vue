<template>
  <div class="main-container">
    <template v-if="error !== null && error !== undefined">
      <div class="one-error">
        {{ error }}
      </div>
    </template>
    <template v-else>
      <transition
        name="fade"
        mode="out-in"
      >
        <template v-if="type === 'playlist'">
          <ul v-if="content.length > 0">
            <li
              v-for="(playlist, index) in content"
              :key="index"
              v-wave
            >
              <router-link :to="{ name: 'Playlist', params: { playlist: playlist.uid } }">
                <p class="just-title episode-title">
                  <i class="fas fa-play" />
                  {{ playlist.title }}
                </p>
              </router-link>
            </li>
          </ul>
          <div
            v-else
            class="one-error message"
          >
            Este usuário não possui nenhuma playlist.
          </div>
        </template>
        <template v-else>
          <ul v-if="content.length > 0">
            <li
              v-for="(show, index) in content"
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
          <div
            v-else
            class="one-error message"
          >
            Este usuário não possui nenhum programa.
          </div>
        </template>
      </transition>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      content: [],
      error: null
    }
  },
  watch: {
    type () {
      const { user, url, $axios } = this
      this.content = []
      this.error = null

      $axios(`/users/${user}/${url}`)
        .then(result => {
          this.content = result.data.response
        })
        .catch(err => {
          if (err.response) {
            const response = err.response.data

            this.error = response
          } else {
            this.error = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
          }
        })
    }
  },
  created () {
    const { user, url, $axios } = this

    $axios(`/users/${user}/${url}`)
      .then(result => {
        this.content = result.data.response
      })
      .catch(err => {
        if (err.response) {
          const response = err.response.data

          this.error = response
        } else {
          this.error = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
        }
      })
  }
}
</script>

<style>

</style>
