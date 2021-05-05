<template>
  <div class="container content">
    <template v-if="userFound === null || userFound === undefined">
      <div class="one-error">
        {{ error }}
      </div>
    </template>
    <template v-else>
      <div class="thumb-title">
        <div class="photo">
          <img
            :src="$api + userFound.url_photo"
            :alt="userFound.username"
            :class="{ photoIcon: userFound.url_photo.includes('.svg') }"
          >
        </div>
        <div class="thumb-content">
          <h1 class="title">
            {{ userFound.username }}
          </h1>
        </div>
      </div>
      <p class="created">
        Criado em {{ userFound.createdAt | DATE }}
      </p>
      <div class="options">
        <button
          v-wave
          :class="{ selected: showPlaylists }"
          @click="playlists"
        >
          Playlists
        </button>
        <button
          v-wave
          :class="{ selected: !showPlaylists }"
          @click="shows"
        >
          Programas
        </button>
      </div>
      <div class="main-container">
        <ul>
          <li v-wave>
            <router-link to="/teste">
              <p class="just-title episode-title">
                <i class="fas fa-play" />
                Minha playlist
              </p>
            </router-link>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      userFound: null,
      showPlaylists: true,
      error: null
    }
  },
  created () {
    this.$axios(`/users/${this.user}`)
      .then(result => {
        this.userFound = result.data.response
      })
      .catch(err => {
        if (err.response) {
          this.error = err.response.data
        } else {
          this.error = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
        }
      })
  },
  methods: {
    playlists () {
      this.showPlaylists = true
    },
    shows () {
      this.showPlaylists = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables.scss';

.options {
  margin: 20px 0 40px 0;
  width: 100%;
  display: flex;

  button {
    width: 50%;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: .5px;
    height: 38px;
    border-bottom: 2px solid transparent;
    transition: all .5s ease;
    border-radius: 0;
    background: transparent;
    color: $white-color;
  }

  .selected {
    border-bottom: 2px solid $white-color;
  }
}
</style>
