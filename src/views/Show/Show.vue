<template>
  <div class="container content">
    <div class="thumb-title">
      <div class="photo">
        <img
          src="https://picsum.photos/340"
          alt="Miniatura do programa"
        >
      </div>
      <div class="thumb-content">
        <h1 class="title">
          WA Podcast
        </h1>
        <router-link to="/clovis">
          Autoria do WA
        </router-link>
      </div>
    </div>
    <div class="line-content">
      <button class="button-follow">
        Seguir
      </button>
      <router-link
        to="/"
        class="category"
      >
        Saúde e bem estar
      </router-link>
    </div>
    <p class="about">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vivamus dictum eu libero id gravida. Ut ac elementum lorem.
    </p>
    <p class="created">
      Criado em 12/03/2021 • 30 seguidores
    </p>
    <router-link
      v-wave
      to="/a"
      class="button-edit"
    >
      <i class="fas fa-pencil-alt" /> Editar
    </router-link>
    <div class="main-container">
      <ul>
        <li v-wave>
          <router-link to="/teste">
            <p class="just-title episode-title">
              <i class="fas fa-play" />
              Conversa com pessoa X no dia Y
            </p>
            <p class="time">
              01:15:30
            </p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Programa X • Upcast'
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/show.scss';
</style>
