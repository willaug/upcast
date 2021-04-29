<template>
  <div class="container content">
    <h1 class="title">
      Editar programa
    </h1>
    <upload />
    <form class="edit-form">
      <label for="">Título</label>
      <input
        type="text"
        placeholder="Editar o título"
      >
      <label for="">Descrição</label>
      <textarea placeholder="Editar a descrição (Opcional)" />
      <label for="">Categoria</label>
      <div class="select">
        <select>
          <option
            selected
            disabled
          >
            Editar a categoria
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
        Deletar programa
      </button>
    </form>
  </div>
</template>

<script>
import Upload from '../../components/PhotoUpload'

export default {
  components: { Upload },
  metaInfo: {
    title: 'Editar PROGRAMA X • Upcast'
  }
}
</script>

<style lang="scss" scoped>
  @import '../../styles/edit-form.scss';
</style>
