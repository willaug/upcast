<template>
  <div class="container content">
    <div class="search">
      <label for="query">
        <i class="fas fa-search" />
      </label>
      <input
        id="query"
        type="text"
        placeholder="Buscar no Upcast"
      >
    </div>
    <div>
      <button
        v-wave
        class="button-filter"
        @click="showTypesList = !showTypesList"
      >
        <i class="fas fa-filter" />
        FILTRAR POR
      </button>
      <transition name="fade">
        <ul
          v-if="showTypesList"
          class="list-types"
        >
          <li
            v-for="type in typesList"
            :key="type"
            :class="{ 'selected-type': type === selectedType }"
          >
            {{ type }}
          </li>
          <hr>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    query: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      typesList: ['Todos', 'Usuários', 'Categorias', 'Programas', 'Episódios', 'Playlists'],
      selectedType: 'Todos',
      showTypesList: false
    }
  },
  created () {
    console.log(this.query)
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/search.scss';
</style>
