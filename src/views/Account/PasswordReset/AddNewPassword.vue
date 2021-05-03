<template>
  <form class="form-container">
    <router-link :to="{ name: 'Home' }">
      <img
        src="/icons/logo.svg"
        alt="Upcast"
      >
    </router-link>
    <h1>Adicionar nova senha</h1>
    <transition
      name="fade"
    >
      <ul
        v-if="verificationErrors.length > 0"
        class="error-list"
      >
        <li
          v-for="(error, index) in verificationErrors"
          :key="index"
        >
          {{ error }}
        </li>
      </ul>
    </transition>
    <input
      v-model="password"
      type="password"
      placeholder="Adicione uma nova senha"
    >
    <input
      v-model="confirmPassword"
      type="password"
      placeholder="Confirme a nova senha"
    >
    <button
      v-wave
      type="button"
      @click="addNewPassword"
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
  </form>
</template>

<script>
export default {
  metaInfo: {
    title: 'Adicionar nova senha • Upcast'
  },
  props: {
    passwordReset: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      verificationErrors: [],
      errors: [],
      password: null,
      confirmPassword: null
    }
  },
  created () {
    const { passwordReset, $axios } = this

    $axios(`/password-reset/${passwordReset}`)
      .catch(err => {
        if (err.response) {
          const response = err.response.data
          const responseIsArray = Array.isArray(response)

          if (responseIsArray) {
            this.verificationErrors = response
          } else {
            this.verificationErrors.push(response)
          }
        } else {
          const message = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
          this.verificationErrors.push(message)
        }
      })
  },
  methods: {
    addNewPassword () {
      const { passwordReset, password, confirmPassword, $axios, $router } = this
      const data = { password, confirmPassword }

      this.verificationErrors = []
      this.errors = []

      $axios.patch(`/password-reset/${passwordReset}`, data)
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../styles/form.scss';
</style>
