<template>
  <div class="container content">
    <div class="thumb-title">
      <img
        src="https://picsum.photos/340"
        alt="Miniatura do programa"
      >
      <div class="thumb-content">
        <h1 class="title">
          WA Podcast
        </h1>
        <p>Autoria do WA</p>
      </div>
    </div>
    <div class="line-content">
      <button class="button-follow">
        Seguir
      </button>
      <span class="category">
        Saúde e bem estar
      </span>
    </div>
    <p class="about">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vivamus dictum eu libero id gravida. Ut ac elementum lorem.
    </p>
    <div class="main-container">
      <ul>
        <li v-wave>
          <router-link to="/teste">
            <p class="just-title">
              <i class="fas fa-play" />
              Flow Podcast
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
