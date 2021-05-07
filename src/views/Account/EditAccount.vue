<template>
  <div class="full-container">
    <div class="container content">
      <h1 class="title">
        Editar conta
      </h1>
      <upload
        :photo-url="account.photo"
        :patch-url="'/account'"
        :push="'Account'"
        :auth="auth"
      />
      <form class="edit-form">
        <div class="label-input">
          <label for="name">Nome</label>
          <input
            id="name"
            type="text"
            :value="account.username"
            placeholder="Digite seu nome"
          >
        </div>
        <div class="label-input">
          <label for="email">E-mail</label>
          <input
            id="email"
            v-model="account.email"
            type="email"
            placeholder="Digite seu e-mail"
          >
        </div>
        <hr>
        <div class="label-input">
          <label for="password">Senha atual</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Digite a senha atual"
          >
        </div>
        <div class="label-input">
          <label for="newPassword">Nova senha</label>
          <input
            id="newPassword"
            v-model="newPassword"
            type="password"
            placeholder="Digite a nova senha"
          >
        </div>
        <div class="label-input">
          <label for="confirmPassword">Confirmar nova senha</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="Repita a nova senha"
          >
        </div>
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
          @click="deleteAccount"
        >
          Deletar minha conta permanentemente
        </button>
      </form>
    </div>
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
    },
    auth () {
      return this.$store.getters.getAuth
    }
  },
  created () {
    this.$store.dispatch('SignInWithToken')
  },
  methods: {
    sendNewData () {
      const { auth, account, password, newPassword, confirmPassword, $axios, $router } = this
      const data = {}
      const username = document.querySelector('#name').value

      this.errors = []
      this.disabled = true

      if (username !== undefined && username !== null) {
        data.username = username
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

      $axios.patch('/account', data, auth)
        .then(() => $router.push({ name: 'Account' }))
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

          window.scrollTo(0, document.body.scrollHeight)
        })
        .finally(() => {
          this.disabled = false
        })
    },
    deleteAccount () {
      const { auth, $axios, $router } = this
      this.errors = []

      $axios.delete('/account', auth)
        .then(() => {
          localStorage.removeItem('ACCESS_TOKEN')
          $router.push({ name: 'SignIn' })
        }).catch(err => {
          if (err.response) {
            const response = err.response.data
            this.errors.push(response)
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
  @import '../../styles/edit-form.scss';
</style>
