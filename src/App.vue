<template>
  <div>
    <navbar v-if="!pagesWithoutHeader.includes(route)" />

    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
    <transition
      name="slide-up"
    >
      <player v-if="playInfo.uid !== null && playInfo.uid !== undefined" />
    </transition>
  </div>
</template>

<script>
import Navbar from './components/Navbar/Navbar'
import Player from './components/Player/Player'

export default {
  name: 'App',
  components: { Navbar, Player },
  data () {
    return {
      pagesWithoutHeader: [
        'SignUp', 'SignIn', '404', 'PasswordReset', 'AddNewPassword'
      ]
    }
  },
  computed: {
    route () {
      return this.$route.name
    },
    playInfo () {
      return this.$store.getters.getAudio
    }
  }
}
</script>

<style>
  .slide-up-enter-active, .slide-up-leave-active  {
    transition: all .5s ease;
  }

  @keyframes slide-in {
    from { bottom: -200px; }
    to { bottom: 20px; }
  }

  @keyframes slide-out {
    from { bottom: 20px; }
    to { bottom: -200px; }
  }

  .slide-up-enter-active {
    animation: slide-in .6s ease;
  }

  .slide-up-leave-active {
    animation: slide-out .6s ease;
  }
</style>
