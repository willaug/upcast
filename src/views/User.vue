<template>
  <div class="full-container">
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
        <user-content
          :type="content.type"
          :url="content.url"
          :user="user"
        />
      </template>
    </div>
  </div>
</template>

<script>
import UserContent from '../components/UserContent'

export default {
  components: { UserContent },
  props: {
    user: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      userFound: null,
      content: { type: 'playlist', url: 'playlists' },
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
      this.content = { type: 'playlist', url: 'playlists' }
    },
    shows () {
      this.showPlaylists = false
      this.content = { type: 'show', url: 'shows' }
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
    cursor: pointer;
  }

  .selected {
    border-bottom: 2px solid $white-color;
  }
}

@media (min-width: 1024px) {
  .options {
    margin: 40px 0 60px 0;

    button {
      font-size: 16px;
      border-bottom: 3px solid transparent;
      height: 45px;
    }

    .selected {
      border-bottom: 3px solid $white-color;
    }
  }

}
</style>
