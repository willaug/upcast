<template>
  <form class="form-container">
    <router-link :to="{ name: 'Home' }">
      <img
        src="/icons/logo.svg"
        alt="Upcast"
      >
    </router-link>
    <h1>Recuperar conta</h1>
    <input
      type="email"
      placeholder="Adicione um e-mail"
    >
    <button
      v-wave
      type="button"
    >
      Continuar
    </button>
  </form>
</template>

<script>
export default {
  metaInfo: {
    title: 'Recuperar conta • Upcast'
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/account/form.scss';
</style>
