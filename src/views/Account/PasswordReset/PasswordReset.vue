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
      v-model="email"
      type="email"
      placeholder="Adicione um e-mail"
    >
    <button
      v-wave
      type="button"
      @click="addPasswordReset"
    >
      Continuar
    </button>
    <transition
      name="fade"
    >
      <div
        v-if="success !== null"
        class="success"
      >
        {{ success }}
      </div>
    </transition>
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
    title: 'Recuperar conta • Upcast'
  },
  data () {
    return {
      email: null,
      success: null,
      errors: []
    }
  },
  methods: {
    addPasswordReset () {
      const { email, $axios } = this
      const data = { email }
      this.errors = []
      this.success = null

      $axios.post('password-reset', data)
        .then(result => {
          this.success = result.data
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
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../../styles/form.scss';
</style>
