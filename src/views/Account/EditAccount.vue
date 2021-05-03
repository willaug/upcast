<template>
  <div class="container content">
    <h1 class="title">
      Editar conta
    </h1>
    <upload />
    <form class="edit-form">
      <label for="name">Nome</label>
      <input
        id="name"
        v-model="account.username"
        type="text"
        placeholder="Digite seu nome"
      >
      <label for="email">E-mail</label>
      <input
        id="email"
        v-model="account.email"
        type="email"
        placeholder="Digite seu e-mail"
      >
      <hr>
      <label for="password">Senha atual</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Digite a senha atual"
      >
      <label for="newPassword">Nova senha</label>
      <input
        id="newPassword"
        v-model="newPassword"
        type="password"
        placeholder="Digite a nova senha"
      >
      <label for="confirmPassword">Confirmar nova senha</label>
      <input
        id="confirmPassword"
        v-model="confirmPassword"
        type="password"
        placeholder="Repita a nova senha"
      >
      <button
        v-wave
        type="button"
        class="button-edit-form"
        :disabled="disabled"
        @click="sendNewData"
      >
        Salvar
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
      <button
        v-wave
        type="button"
        class="button-delete"
      >
        Deletar minha conta permanentemente
      </button>
    </form>
  </div>
</template>

<script>
import Upload from '../../components/PhotoUpload'

export default {
  components: { Upload },
  metaInfo: {
    title: 'Editar conta • Upcast'
  },
  data () {
    return {
      password: null,
      newPassword: null,
      confirmPassword: null,
      errors: [],
      disabled: false
    }
  },
  computed: {
    account () {
      return this.$store.getters.getAccount
    }
  },
  created () {
    this.$store.dispatch('SignInWithToken')
  },
  methods: {
    async sendNewData () {
      const { account, password, newPassword, confirmPassword, $axios, $router, $store } = this
      const data = {}

      const auth = $store.getters.getAuth

      this.errors = []
      this.disabled = true

      if (account.username !== undefined && account.username !== null) {
        data.username = account.username
      }

      if (account.email !== undefined && account.email !== null) {
        data.email = account.email
      }

      if (password !== undefined && password !== null) {
        data.currentPassword = password
      }

      if (newPassword !== undefined && newPassword !== null) {
        data.newPassword = newPassword
      }

      if (confirmPassword !== undefined && confirmPassword !== null) {
        data.confirmPassword = confirmPassword
      }

      try {
        await $axios.patch('/account', data, auth)
        $router.push({ name: 'Account' })
      } catch (err) {
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
      } finally {
        this.disabled = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/edit-form.scss';
</style>
