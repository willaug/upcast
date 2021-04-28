<template>
  <div class="container content">
    <div class="main-container">
      <h1 class="title">
        Explorar
      </h1>
      <ul class="pb-4 thumbnail-list">
        <li
          v-wave
          class="thumbnail"
        >
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
        <li
          v-wave
          class="thumbnail"
        >
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
        <li
          v-wave
          class="thumbnail"
        >
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
        <li
          v-wave
          class="thumbnail"
        >
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
      <h2>Programas recentes</h2>
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
