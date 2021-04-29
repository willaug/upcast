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
              v-wave
              :to="{ name: 'SignIn' }"
              class="auth-link"
            >
              <i class="fas fa-sign-in-alt" />
              <p>Entrar</p>
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
          <li>
            <router-link
              v-wave
              to="/search"
              exact-active-class="link-enabled"
            >
              <i class="fas fa-search" />
              <p>Buscar</p>
            </router-link>
          </li>
          <hr>
          <li>
            <router-link
              v-wave
              to="/users/x"
              exact-active-class="link-enabled"
            >
              <i class="fas fa-user" />
              <p>Perfil</p>
            </router-link>
          </li>
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
      backgroundMenu: false
    }
  },
  created () {
    if (screen.width >= 1024) {
      this.menu = true
      this.backgroundMenu = false
    }
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './navbar.scss';
</style>
