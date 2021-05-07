<template>
  <div class="warning">
    Página não encontrada
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Página não encontrada • Upcast'
  }
}
</script>

<style lang="scss" scoped>
  @import '../styles/variables.scss';

  .warning {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  max-width: 500px;
  background: $dark-color;
  border-radius: 15px;
  padding: 25px;
  color: $light-color;
  text-align: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 16px;
}

@media (min-width: 1024px) {
  .warning {
    font-size: 20px;
    padding: 30px;
      border-radius: 20px;
  }
}

</style>
