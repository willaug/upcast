<template>
  <div class="container content">
    <h1 class="title">
      Criar programa
    </h1>
    <form class="edit-form">
      <label for="">Título</label>
      <input
        type="text"
        placeholder="Adicione um título para o programa"
      >
      <label for="">Descrição</label>
      <textarea placeholder="Digite a descrição (Opcional)" />
      <label for="">Categoria</label>
      <div class="select">
        <select>
          <option
            selected
            disabled
          >
            Escolha a categoria
          </option>
        </select>
      </div>
      <button
        v-wave
        type="button"
        class="button-edit-form"
      >
        Enviar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Criar programa • Upcast'
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/edit-form.scss';
</style>
