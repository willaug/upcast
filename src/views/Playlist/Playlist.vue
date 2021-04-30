<template>
  <div class="container content">
    <h1 class="title">
      Playlist
    </h1>
    <p class="about">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vivamus dictum eu libero id gravida. Ut ac elementum lorem.
    </p>
    <p class="created">
      Criado em 12/03/2021 • Alterado em 13/04/2021
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
    title: 'Playlist X • Upcast'
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/show.scss';
</style>
