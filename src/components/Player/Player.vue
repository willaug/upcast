<template>
  <div class="player-container">
    <button
      class="button-close"
      title="Fechar"
      @click="close"
    >
      <i class="fas fa-times" />
    </button>
    <p class="episode-title">
      {{ playInfo.title }}
    </p>
    <p class="episode-show">
      {{ playInfo.show }}
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
            v-model.number="audioInfo.volume"
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
        v-model.number="audio.currentTime"
        type="range"
        placeholder="Minutagem"
        min="0"
        :max="seekbar.max"
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
      playing: true,
      seekbar: {
        max: undefined
      }
    }
  },
  computed: {
    playInfo () {
      return this.$store.getters.getAudio
    }
  },
  watch: {
    playInfo () {
      this.audio.src = this.playInfo.src
      this.playing = true
      this.audio.play()
    }
  },
  created () {
    this.audio = new Audio(this.playInfo.src)
    this.audio.volume = this.audioInfo.volume
    this.audio.loop = false
    this.audio.play()

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
  destroyed () {
    this.audio.pause()
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
      this.audio.volume = this.audioInfo.volume
    },
    close () {
      this.$store.commit('listenAudio', {})
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './player.scss';
</style>
