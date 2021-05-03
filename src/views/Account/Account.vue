<template>
  <div class="container content">
    <h1 class="title">
      Minha conta
    </h1>
    <div class="photo">
      <img
        v-if="account.photo"
        :src="$api + account.photo"
        :class="{ photoIcon: account.photo.includes('.svg') }"
        alt="Miniatura do usuário"
      >
    </div>
    <table>
      <tr>
        <td>Nome</td>
        <td>{{ account.username }}</td>
      </tr>
      <tr>
        <td>E-mail</td>
        <td>{{ account.email }}</td>
      </tr>
      <tr>
        <td>Criou em</td>
        <td>{{ account.createdAt | DATETIME }}</td>
      </tr>
      <tr>
        <td>Alterou em</td>
        <td>{{ account.updatedAt | DATETIME }}</td>
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
      return this.$store.getters.getAccount
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
