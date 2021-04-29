<template>
  <form class="form-container">
    <router-link :to="{ name: 'Home' }">
      <img
        src="/icons/logo.svg"
        alt="Upcast"
      >
    </router-link>
    <h1>Entrar</h1>
    <input
      type="email"
      placeholder="Digite seu e-mail"
    >
    <input
      type="password"
      placeholder="Digite sua senha"
    >
    <button
      v-wave
      type="button"
    >
      Continuar
    </button>
    <router-link
      class="link"
      :to="{ name: 'PasswordReset' }"
    >
      Esqueceu a senha?
    </router-link>
    <router-link
      class="link"
      :to="{ name: 'SignUp' }"
    >
      Criar conta
    </router-link>
  </form>
</template>

<script>
export default {
  metaInfo: {
    title: 'Entrar • Upcast'
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/form.scss';
</style>
