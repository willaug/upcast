<template>
  <div class="container content">
    <div class="gradient">
      Ouça o quanto quiser!
    </div>
    <div class="main-container">
      <h2>Conheça</h2>
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
  </div>
</template>

<script>

export default {
  metaInfo: {
    title: 'Ouça o quanto quiser • Upcast'
  }
}
</script>
