<template>
  <div class="container content">
    <h1 class="title">
      Minha conta
    </h1>
    <div class="photo">
      <img
        :src="$api + account"
        alt="Miniatura do usuário"
      >
    </div>
    <table>
      <tr>
        <td>Nome</td>
        <td>{{ account }}</td>
      </tr>
      <tr>
        <td>E-mail</td>
        <td>{{ account }}</td>
      </tr>
      <tr>
        <td>Criou em</td>
        <td>XX/XX/XXXX às 22:20</td>
      </tr>
      <tr>
        <td>Alterou em</td>
        <td>XX/XX/XXXX às 22:20</td>
      </tr>
    </table>
    <router-link
      v-wave
      :to="{ name: 'EditAccount' }"
      class="button-settings"
    >
      Editar perfil
    </router-link>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Minha conta • Upcast'
  },
  computed: {
    account () {
      return this.$store.state.accountData
    }
  },
  created () {
    this.$store.dispatch('SignInWithToken')
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/account/profile.scss';
</style>
