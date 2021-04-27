<template>
  <div class="container content">
    <div class="gradient">
      Ouça o quanto quiser!
    </div>
    <div class="grid-container">
      <h1>Conheça novos programas</h1>
      <ul>
        <li v-wave>
          <router-link to="/teste">
            <img
              src="https://picsum.photos/340"
              alt="Miniatura do programa"
            >
            <p>Flow Podcast</p>
          </router-link>
        </li>
      </ul>
    </div>
    <router-link
      v-wave
      to="/clovis"
      class="gradient bg-image"
    >
      <i class="fas fa-podcast" />
      Explorar conteúdos
    </router-link>
  </div>
</template>

<script>

export default {
  metaInfo: {
    title: 'Ouça o quanto quiser • Upcast'
  }
}
</script>

<style>

</style>
