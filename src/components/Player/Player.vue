<template>
  <div class="player-container">
    <!-- <audio
      src="http://127.0.0.1:3000/audios/YMw8qEIK9tdmDm9ZzStk.mp3"
    /> -->
    <button
      class="button-close"
    >
      <i class="fas fa-times" />
    </button>
    <p class="episode-title">
      Meu episódio
    </p>
    <p class="episode-show">
      MyCast
    </p>
    <div class="centralized-buttons">
      <button
        class="button-sound"
      >
        <i class="fas fa-volume-down" />
      </button>
      <button
        class="button-player"
      />
    </div>
    <div class="range-slider">
      <p>
        00:01:45
      </p>
      <input
        type="range"
      >
      <p>
        01:10:20
      </p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  @import './player.scss';
</style>
