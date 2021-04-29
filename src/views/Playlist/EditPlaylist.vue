<template>
  <div class="container content">
    <h1 class="title">
      Editar playlist
    </h1>
    <form class="edit-form">
      <label for="">Título</label>
      <input
        type="text"
        placeholder="Alterar o título da playlist"
      >
      <button
        v-wave
        type="button"
        class="button-edit-form"
      >
        Salvar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Alterar PLAYLIST X • Upcast'
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/edit-form.scss';
</style>
