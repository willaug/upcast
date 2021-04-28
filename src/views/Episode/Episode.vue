<template>
  <div class="container content">
    <div class="main-container">
      <h1 class="title">
        Conversa com pessoa X no dia Y
      </h1>
      <p class="shows">
        <router-link to="/teste">
          WA Podcast
        </router-link>
        • 13/04/2021 • 01:15:30
      </p>
      <p class="about">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vivamus dictum eu libero id gravida. Ut ac elementum lorem.
      </p>
      <button
        v-wave
        type="button"
        class="button-play"
      >
        <i class="fas fa-play" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Episódio X • Upcast'
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/episode.scss';
</style>
