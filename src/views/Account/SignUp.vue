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
      v-model="email"
      type="email"
      placeholder="Adicione um e-mail"
    >
    <input
      v-model="username"
      type="text"
      placeholder="Adicione um nome de usuário"
    >
    <input
      v-model="password"
      type="password"
      placeholder="Adicione uma senha"
    >
    <button
      v-wave
      type="button"
      :disabled="disabled"
      @click="createUser"
    >
      Continuar
    </button>
    <ul
      v-if="errors.length > 0"
      class="error-list"
    >
      <li
        v-for="(error, index) in errors"
        :key="index"
      >
        {{ error }}
      </li>
    </ul>
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
  },
  data () {
    return {
      email: null,
      username: null,
      password: null,
      errors: [],
      disabled: false
    }
  },
  methods: {
    async createUser () {
      const { email, username, password, $axios, $router } = this
      const data = { email, username, password }

      this.errors = []
      this.disabled = true

      try {
        await $axios.post('/users', data)

        $router.push({ name: 'SignIn' })
      } catch (err) {
        this.errors = err.response.data
      } finally {
        this.disabled = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/form.scss';
</style>
