<template>
  <div>
    <navbar v-if="!pagesWithoutHeader.includes(route)" />

    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
    <player />
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
    }
  }
}
</script>
