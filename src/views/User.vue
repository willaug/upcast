<template>
  <div class="container content">
    <div class="thumb-title">
      <div class="photo">
        <img
          src="https://picsum.photos/256"
          alt="Miniatura do usuário"
        >
      </div>
      <div class="thumb-content">
        <h1 class="title">
          Lorem Ipsum
        </h1>
      </div>
    </div>
    <p class="created">
      Criado em 12/03/2021
    </p>
    <div class="options">
      <button
        v-wave
        class="selected"
      >
        Playlists
      </button>
      <button v-wave>
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
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Usuário X • Upcast'
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
    transition: all .2s ease;
    border-radius: 0;
    background: transparent;
    color: $white-color;
  }

  .selected {
    border-bottom: 2px solid $white-color;
  }
}
</style>
