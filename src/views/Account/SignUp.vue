<template>
  <form class="form-container">
    <router-link :to="{ name: 'Home' }">
      <img
        src="/icons/logo.svg"
        alt="Upcast"
      >
    </router-link>
    <h1>Criar uma conta</h1>
    <input
      type="email"
      placeholder="Adicione um e-mail"
    >
    <input
      type="text"
      placeholder="Adicione um nome de usuário"
    >
    <input
      type="password"
      placeholder="Adicione uma senha"
    >
    <input
      type="password"
      placeholder="Confirme a senha"
    >
    <button
      v-wave
      type="button"
    >
      Continuar
    </button>
    <router-link
      class="link"
      :to="{ name: 'SignIn' }"
    >
      Já possui uma conta?
    </router-link>
  </form>
</template>

<script>
export default {
  metaInfo: {
    title: 'Criar conta gratuita • Upcast'
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/account/form.scss';
</style>
