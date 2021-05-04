<template>
  <div class="container content">
    <template v-if="showFound === null || showFound === undefined">
      <div class="one-error">
        {{ error }}
      </div>
    </template>
    <template v-else>
      <div class="thumb-title">
        <div class="photo">
          <img
            :src="$api + showFound.url_photo"
            :alt="showFound.title"
            :class="{ photoIcon: showFound.url_photo.includes('.svg') }"
          >
        </div>
        <div class="thumb-content">
          <h1 class="title">
            {{ showFound.title }}
          </h1>
          <router-link :to="{ name: 'User', params: { user: showFound.author.uid } }">
            {{ showFound.author.username }}
          </router-link>
        </div>
      </div>
      <div class="line-content">
        <button
          class="button-follow"
          :class="{ following }"
          @click="follow"
          v-text="following ? 'Seguindo' : 'Seguir'"
        />
        <router-link
          :to="{ name: 'Category', params: { category: showFound.category.slug } }"
          class="category"
        >
          {{ showFound.category.name }}
        </router-link>
      </div>
      <div
        v-if="errorFollow !== null && errorFollow !== undefined"
        class="one-error"
      >
        {{ errorFollow }}
      </div>
      <p
        class="about"
      >
        {{ showFound.description || 'Sem descrição' }}
      </p>
      <p class="created">
        Criado em {{ showFound.createdAt | DATE }} •
        <span v-text="followers === 0 ? 'Nenhum seguidor' : `${followers} seguidores`" />
      </p>
      <router-link
        v-if="account.uid === showFound.author.uid"
        v-wave
        :to="{ name: 'EditShow', params: { show: showFound.uid } }"
        class="button-edit"
      >
        <i class="fas fa-pencil-alt" /> Editar
      </router-link>
      <template v-if="showFound.episodes.length > 0">
        <div class="main-container">
          <ul
            v-for="(episode, index) in showFound.episodes"
            :key="index"
          >
            <li v-wave>
              <router-link :to="{ name: 'Episode', params: { episode: episode.uid } }">
                <p class="just-title episode-title">
                  <i class="fas fa-play" />
                  {{ episode.title }}
                </p>
                <p class="time">
                  {{ episode.duration }}
                </p>
              </router-link>
            </li>
          </ul>
        </div>
      </template>
      <template v-else>
        <div class="one-error message">
          Ainda não há episódios neste programa.
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showFound: null,
      followers: 0,
      following: false,
      error: null,
      errorFollow: null
    }
  },
  computed: {
    auth () {
      return this.$store.getters.getAuth
    },
    account () {
      return this.$store.getters.getAccount
    }
  },
  async created () {
    try {
      const show = await this.$axios(`/shows/${this.show}`)
      const followers = await this.$axios(`/shows/${this.show}/followers`)

      if (this.account.uid !== null && this.account.uid !== undefined) {
        const following = await this.$axios(`/shows/${this.show}/following`, this.auth)
        this.following = following.data.response
      }

      this.showFound = show.data.response
      this.followers = followers.data.response

      document.title = `${this.showFound.title} • Upcast`
    } catch (err) {
      if (err.response) {
        this.error = err.response.data
      } else {
        this.error = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
      }
    }
  },
  methods: {
    async follow () {
      if (this.account.uid !== null && this.account.uid !== undefined) {
        try {
          const { following, $axios, auth, show } = this

          this.errorFollow = null

          if (following) {
            await $axios.delete(`/shows/${show}/follow`, auth)
            --this.followers
          } else {
            await $axios.post(`/shows/${show}/follow`, {}, auth)
            ++this.followers
          }

          this.following = !following
        } catch (err) {
          if (err.response) {
            this.errorFollow = err.response.data
          } else {
            this.errorFollow = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
          }
        }
      } else {
        this.$router.push({ name: 'SignIn' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/show.scss';
</style>
