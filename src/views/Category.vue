<template>
  <div class="container content">
    <div class="main-container">
      <h1 class="title">
        Categoria X
      </h1>
      <h2>Conheça programas</h2>
      <ul>
        <li v-wave>
          <router-link to="/teste">
            <img
              src="https://picsum.photos/320"
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
    title: 'Categoria X • Upcast'
  }
}
</script>
