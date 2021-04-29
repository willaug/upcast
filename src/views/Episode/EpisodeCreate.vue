<template>
  <div class="container content">
    <h1 class="title">
      Criar episódio
    </h1>
    <form class="edit-form">
      <label for="">Título</label>
      <input
        type="text"
        placeholder="Adicione um título para o episódio"
      >
      <label for="">Descrição</label>
      <textarea placeholder="Digite a descrição (Opcional)" />
      <label for="">Programa</label>
      <div class="select">
        <select>
          <option
            selected
            disabled
          >
            Escolha o programa
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
    title: 'Criar episódio • Upcast'
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/edit-form.scss';
</style>
