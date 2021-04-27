<template>
  <div class="container content">
    <div class="grid-container">
      <ul>
        <li v-wave>
          <router-link
            to="/teste"
            class="icon"
          >
            <img
              src="/icons/icon.svg"
              alt="Miniatura da categoria"
            >
            <p>Convívio e espiritualidade</p>
          </router-link>
        </li>
      </ul>
      <h1>Encontrar programas</h1>
      <ul>
        <li v-wave>
          <router-link to="/teste">
            <img
              src="https://picsum.photos/380"
              alt="Miniatura do programa"
            >
            <p>Flow Podcast</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Explorar novos conteúdos • Upcast'
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/index/home.scss';
</style>
