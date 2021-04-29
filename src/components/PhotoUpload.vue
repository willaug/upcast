<template>
  <div>
    <div class="photo">
      <img
        src="https://picsum.photos/320"
        alt="Miniatura"
      >
      <button
        v-wave
        class="options"
      >
        <i class="fas fa-camera" />
      </button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  @import '../styles/variables.scss';

  .photo {
    width: 150px;
    height: 150px;
    position: relative;
    border-radius: 7px;
    background: $dark-color;
    left: 50%;
    margin-bottom: 30px;
    transform: translateX(-50%);

    img {
      width: 150px;
      height: 150px;
      border-radius: 7px;
      object-fit: cover;
    }

    .options {
      position: absolute;
      z-index: 200;
      right: -10px;
      bottom: -10px;
      font-size: 17px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      border-radius: 100px;
      color: $white-color;
      background: $primary-color;
    }
  }
</style>
