<template>
  <div class="container content">
    <h1 class="title">
      Editar conta
    </h1>
    <upload />
    <form class="edit-form">
      <label for="">Nome</label>
      <input
        type="text"
        placeholder="Digite seu nome"
      >
      <label for="">E-mail</label>
      <input
        type="email"
        placeholder="Digite seu e-mail"
      >
      <hr>
      <label for="">Senha atual</label>
      <input
        type="password"
        placeholder="Digite a senha atual"
      >
      <label for="">Nova senha</label>
      <input
        type="password"
        placeholder="Digite a nova senha"
      >
      <label for="">Confirmar nova senha</label>
      <input
        type="password"
        placeholder="Repita a nova senha"
      >
      <button
        v-wave
        type="button"
        class="button-edit-form"
      >
        Salvar
      </button>
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
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/edit-form.scss';
</style>
