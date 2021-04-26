<template>
  <div>
    <header>
      <div class="container nav">
        <img
          src="/icons/logo.svg"
          alt="Upcast"
        >
        <div class="hamburguer">
          <div />
          <div />
          <div />
        </div>
      </div>
    </header>
    <nav>
      <img
        src="/icons/logo.svg"
        alt="Upcast"
      >
      <ul>
        <li>
          <router-link
            to="/authenticate"
            class="auth-link"
          >
            <i class="fas fa-sign-in-alt" />
            <p>Entrar</p>
          </router-link>
        </li>
        <li>
          <router-link
            to="/"
            exact-active-class="link-enabled"
          >
            <i class="fas fa-home" />
            <p>Início</p>
          </router-link>
        </li>
        <li>
          <router-link
            to="/explore"
            exact-active-class="link-enabled"
          >
            <i class="fas fa-compass" />
            <p>Explorar</p>
          </router-link>
        </li>
        <li>
          <router-link
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
            to="/users/x"
            exact-active-class="link-enabled"
          >
            <i class="fas fa-user" />
            <p>Perfil</p>
          </router-link>
        </li>
        <li>
          <router-link
            to="/users/x/playlists"
            exact-active-class="link-enabled"
          >
            <i class="fas fa-headphones" />
            <p>Playlists</p>
          </router-link>
        </li>
        <li>
          <router-link
            to="/users/x/shows"
            exact-active-class="link-enabled"
          >
            <i class="fas fa-microphone" />
            <p>Programas</p>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="menu-background" />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  @import '../styles/navbar.scss';
</style>
