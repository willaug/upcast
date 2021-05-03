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
      v-model="email"
      type="email"
      placeholder="Digite seu e-mail"
    >
    <input
      v-model="password"
      type="password"
      placeholder="Digite sua senha"
    >
    <button
      v-wave
      type="button"
      :disabled="disabled"
      @click="login"
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
  },
  data () {
    return {
      email: null,
      password: null,
      errors: [],
      disabled: false
    }
  },
  methods: {
    login () {
      const { email, password, $axios } = this
      const data = { email, password }

      this.errors = []
      this.disabled = true

      $axios.post('/authenticate', data)
        .then(response => {
          const token = response.data

          localStorage.setItem('ACCESS_TOKEN', token)

          const index = window.location.href.split('/login')[0]
          window.location.replace(index)
        })
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
