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
        @click="showVolumeRange = !showVolumeRange"
      >
        <i
          v-if="audioInfo.volume > 0 && audioInfo.volume < 1"
          class="fas fa-volume-down"
        />
        <i
          v-else-if="audioInfo.volume === 1"
          class="fas fa-volume-up"
        />
        <i
          v-else
          class="fas fa-volume-mute"
        />
        <transition name="fade">
          <input
            v-if="showVolumeRange"
            class="volume-range"
            type="range"
            placeholder="Volume"
            min="0"
            max="1"
            step="0.1"
            @change="changeVolume"
          >
        </transition>
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
        {{ audioInfo.currentTime | DURATION }}
      </p>
      <input
        v-model="audioInfo.currentTime"
        type="range"
        placeholder="Minutagem"
        step="1"
        min="0"
        :max="seekbar.max"
        @change="changeCurrentTime"
      >
      <p>
        {{ seekbar.max | DURATION }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      audio: undefined,
      audioInfo: {
        volume: 0.1,
        currentTime: 0
      },
      showVolumeRange: false,
      playing: false,
      seekbar: {
        max: undefined
      }
    }
  },
  created () {
    const src = 'http://127.0.0.1:3000/audios/YMw8qEIK9tdmDm9ZzStk.mp3' // apagar depois
    this.audio = new Audio(src)
    this.audio.volume = this.audioInfo.volume
    this.audio.loop = false

    this.audio.onloadeddata = () => {
      this.seekbar.max = this.audio.duration
      this.seekbar.min = this.audio.duration

      this.audio.ontimeupdate = () => {
        this.audioInfo.currentTime = this.audio.currentTime
      }

      this.audio.onended = () => {
        this.playing = false
        this.audio.currentTime = 0
        this.audio.pause()
        this.audioInfo.currentTime = 0
      }
    }
  },
  methods: {
    toggleSound () {
      if (this.playing) {
        this.audio.pause()
      } else {
        this.audio.play()
      }

      this.playing = !this.playing
    },
    changeVolume () {
      this.audioInfo.volume = this.audio.volume
    },
    changeCurrentTime () {
      this.audio.currentTime = this.audioInfo.currentTime
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './player.scss';
</style>
