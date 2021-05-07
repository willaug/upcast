<template>
  <div>
    <header>
      <div class="container nav">
        <router-link :to="{ name: 'Home' }">
          <img
            src="/icons/logo.svg"
            alt="Upcast"
          >
        </router-link>
        <div
          class="hamburguer"
          @click="changeMenu"
        >
          <div />
          <div />
          <div />
        </div>
      </div>
    </header>
    <!-- nav -->
    <transition name="fade">
      <div
        v-if="backgroundMenu"
        class="menu-background"
        @click="changeMenu"
      />
    </transition>
    <transition name="slide">
      <nav
        v-if="menu"
        @click="changeMenu"
      >
        <img
          src="/icons/logo.svg"
          alt="Upcast"
        >
        <ul>
          <li>
            <router-link
              v-if="authenticated === false"
              v-wave
              :to="{ name: 'SignIn' }"
              class="auth-link"
            >
              <i class="fas fa-sign-in-alt" />
              <p>Entrar</p>
            </router-link>
            <router-link
              v-else
              v-wave
              :to="{ name: 'Account' }"
              class="auth-link account"
            >
              <img
                :src="$api + account.photo"
                :alt="account.username"
              >
              <p>{{ account.username }}</p>
            </router-link>
          </li>
          <li>
            <router-link
              v-wave
              :to="{ name: 'Home' }"
              exact-active-class="link-enabled"
            >
              <i class="fas fa-home" />
              <p>Início</p>
            </router-link>
          </li>
          <li>
            <router-link
              v-wave
              :to="{ name: 'Explore' }"
              exact-active-class="link-enabled"
            >
              <i class="fas fa-compass" />
              <p>Explorar</p>
            </router-link>
          </li>
          <template v-if="authenticated === true">
            <hr>
            <li>
              <router-link
                v-wave
                :to="{ name: 'User', params: { user: $getUid() } }"
                exact-active-class="link-enabled"
              >
                <i class="fas fa-user" />
                <p>Perfil</p>
              </router-link>
            </li>
            <li
              v-wave
              @click="logout"
            >
              <div class="link-button">
                <i class="fas fa-sign-out-alt" />
                <p>Sair</p>
              </div>
            </li>
            <hr>
            <li>
              <router-link
                v-wave
                :to="{ name: 'CreateEpisode' }"
                exact-active-class="link-enabled"
              >
                <i class="fas fa-forward" />
                <p>Enviar episódio</p>
              </router-link>
            </li>
            <li>
              <router-link
                v-wave
                :to="{ name: 'CreateShow' }"
                exact-active-class="link-enabled"
              >
                <i class="fas fa-microphone" />
                <p>Criar programa</p>
              </router-link>
            </li>
            <li>
              <router-link
                v-wave
                :to="{ name: 'CreatePlaylist' }"
                exact-active-class="link-enabled"
              >
                <i class="fas fa-headphones" />
                <p>Criar playlist</p>
              </router-link>
            </li>
          </template>
        </ul>
      </nav>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menu: false,
      backgroundMenu: false,
      authenticated: false
    }
  },
  computed: {
    account () {
      return this.$store.getters.getAccount
    }
  },
  created () {
    if (screen.width >= 1024) {
      this.menu = true
      this.backgroundMenu = false
    }

    this.$store.dispatch('TokenIsValid').then(response => {
      if (response) {
        this.$store.dispatch('SignInWithToken').then(() => {
          this.authenticated = true
        })
      } else {
        this.authenticated = false
      }
    })
  },
  methods: {
    changeMenu () {
      if (screen.width < 1024) {
        this.menu = !this.menu
        this.backgroundMenu = !this.backgroundMenu

        const body = document.getElementsByTagName('body')[0]

        if (this.menu === true) {
          body.style.overflow = 'hidden'
        } else {
          body.style.overflow = 'auto'
        }
      }
    },
    logout () {
      localStorage.removeItem('ACCESS_TOKEN')

      const index = window.location.href
      window.location.replace(index)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './navbar.scss';
</style>
