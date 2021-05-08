<template>
  <div class="player-container">
    <button
      class="button-close"
      title="Fechar"
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
        title="Volume"
        class="button-sound"
      >
        <i class="fas fa-volume-down" />
      </button>
      <button
        title="Executar/Pausar"
        class="button-player"
        :class="{ playing }"
        @click="toggleSound"
      />
    </div>
    <div class="range-slider">
      <p>
        00:01:45
      </p>
      <input
        type="range"
        placeholder="Minutagem"
      >
      <p>
        02:10:30
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      audio: {
        duration: undefined,
        content: undefined,
        volume: 0.1,
        src: 'http://127.0.0.1:3000/audios/YMw8qEIK9tdmDm9ZzStk.mp3'
      },
      playing: false
    }
  },
  created () {
    this.audio.content = new Audio(this.audio.src)
    this.audio.content.volume = this.audio.volume
    this.audio.content.loop = false
  },
  methods: {
    toggleSound () {
      if (this.playing === false) {
        this.audio.content.play()
      } else {
        this.audio.content.pause()
      }

      this.playing = !this.playing
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './player.scss';
</style>
