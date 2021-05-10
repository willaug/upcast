<template>
  <form
    class="form-container"
    @submit.prevent="createUser"
  >
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
      type="submit"
      :disabled="disabled"
    >
      Continuar
    </button>
    <transition
      name="fade"
    >
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
    </transition>
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
    createUser () {
      const { email, username, password, $axios, $router } = this
      const data = { email, username, password }

      this.errors = []
      this.disabled = true

      $axios.post('/users', data)
        .then(() => $router.push({ name: 'SignIn' }))
        .catch(err => {
          if (err.response) {
            const response = err.response.data
            const responseIsArray = Array.isArray(response)

            if (responseIsArray) {
              this.errors = response
            } else {
              this.errors.push(response)
            }
          } else {
            const message = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
            this.errors.push(message)
          }
        })
        .finally(() => {
          this.disabled = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/form.scss';
</style>
