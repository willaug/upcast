<template>
  <div>
    <navbar v-if="!pagesWithoutHeader.includes(route)" />
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: { Navbar },
  data () {
    return {
      pagesWithoutHeader: [
        'SignUp', 'SignIn', '404'
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

<style lang="css" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
