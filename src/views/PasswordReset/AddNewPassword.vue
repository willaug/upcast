<template>
  <form class="form-container">
    <router-link :to="{ name: 'Home' }">
      <img
        src="/icons/logo.svg"
        alt="Upcast"
      >
    </router-link>
    <h1>Adicionar nova senha</h1>
    <input
      type="password"
      placeholder="Adicione uma nova senha"
    >
    <input
      type="password"
      placeholder="Confirme a nova senha"
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
    title: 'Adicionar nova senha • Upcast'
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/account/form.scss';
</style>
