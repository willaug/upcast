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
      <hr>
      <div class="main-container">
        <ul>
          <li v-wave>
            <router-link to="/teste">
              <p class="just-title episode-title">
                <i class="fas fa-play" />
                Conversa com pessoa X no dia Y
              </p>
              <button
                type="button"
                class="button-remove-item"
              >
                <i class="fas fa-times" />
              </button>
            </router-link>
          </li>
        </ul>
      </div>
      <button
        v-wave
        type="button"
        class="button-delete"
      >
        Deletar playlist
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
