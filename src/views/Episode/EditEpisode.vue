<template>
  <div class="container content">
    <h1 class="title">
      Editar episódio
    </h1>
    <form class="edit-form">
      <div class="upload">
        <i class="fas fa-cloud-upload-alt" />
        <p>Adicionar ou alterar áudio</p>
      </div>
      <label for="">Título</label>
      <input
        type="text"
        placeholder="Editar o título para o episódio"
      >
      <label for="">Descrição</label>
      <textarea placeholder="Editar a descrição (Opcional)" />
      <label for="">Programa</label>
      <div class="select">
        <select>
          <option
            selected
            disabled
          >
            Editar o programa
          </option>
        </select>
      </div>
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
        Deletar episódio
      </button>
    </form>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Editar EPISÓDIO X • Upcast'
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/edit-form.scss';
</style>
