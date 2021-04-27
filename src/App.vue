<template>
  <div>
    <navbar v-if="route !== 'SignUp' && route !== 'SignIn'" />
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: { Navbar },
  computed: {
    route () {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
