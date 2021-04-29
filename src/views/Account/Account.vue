<template>
  <div class="container content">
    <h1 class="title">
      Minha conta
    </h1>
    <div class="photo">
      <img
        src="https://picsum.photos/320"
        alt="Miniatura do usuário"
      >
    </div>
    <table>
      <tr>
        <td>Nome</td>
        <td>XXXXX</td>
      </tr>
      <tr>
        <td>E-mail</td>
        <td>lorem@ipsum.com.br</td>
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
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/account/profile.scss';
</style>
