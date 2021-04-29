<template>
  <div class="container content">
    <h1 class="title">
      Criar playlist
    </h1>
    <form class="edit-form">
      <label for="">Título</label>
      <input
        type="text"
        placeholder="Adicione um título para a playlist"
      >
      <button
        v-wave
        type="button"
        class="button-edit-form"
      >
        Criar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Criar playlist • Upcast'
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/edit-form.scss';
</style>
