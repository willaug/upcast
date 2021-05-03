<template>
  <div>
    <div class="photo">
      <input
        id="avatar"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        style="display: none"
        @change="sendImage"
      >
      <img
        :src="$api + photoUrl"
        :class="{ photoIcon: photoIcon === true }"
        alt="Miniatura"
      >
      <button
        v-wave
        class="button-options"
        :disabled="disabled"
        @click="showOptions = !showOptions"
      >
        <i class="fas fa-camera" />
      </button>
      <transition
        name="fade"
        mode="out-in"
      >
        <ul
          v-if="showOptions"
          class="list-options"
        >
          <li
            v-wave
            @click="showOptions = !showOptions, callInputFile()"
          >
            <i class="fas fa-upload" />
            Adicionar imagem
          </li>
          <li
            v-wave
            @click="showOptions = !showOptions"
          >
            <i class="fas fa-trash-alt" />
            Deletar imagem
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photoUrl: {
      type: String,
      default: null
    },
    patchUrl: {
      type: String,
      required: true
    },
    push: {
      type: String,
      required: true
    },
    auth: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showOptions: false,
      error: null,
      disabled: false
    }
  },
  methods: {
    photoIcon () {
      const photo = this.account.photo
      if (photo.includes('.svg')) {
        return true
      } else {
        return false
      }
    },
    callInputFile () {
      document.getElementById('avatar').click()
    },
    async sendImage (event) {
      const item = event.target.files[0]
      const formData = new FormData()
      const upload = {
        headers: {
          'Content-type': 'multipart/form-data',
          Authorization: this.auth.headers.Authorization
        }
      }

      formData.append('photo', item)

      this.error = null
      this.disabled = true

      try {
        const { $axios, $router, push, patchUrl } = this
        await $axios.patch(patchUrl, formData, upload)

        $router.push({ name: push })
      } catch (err) {
        if (err.response) {
          const response = err.response.data

          this.error = response
          console.log(this.error)
        } else {
          this.error = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
        }
      } finally {
        this.disabled = false
      }
    }
  }
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

    .photoIcon {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 60%;
        height: 60%;
    }

    .button-options {
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

    .list-options {
      position: absolute;
      z-index: 3000;
      bottom: -30px;
      left: 50%;
      width: 200px;
      transform: translateX(-50%);
      background: $light-color;
      border-radius: 6px;
      padding: 10px 0;

      li {
        padding: 10px 20px;
        cursor: pointer;
        text-align: left;
        color: $dark-color;
        font-weight: 500;
        font-size: 13px;

        .fas {
          margin-right: 10px;
        }
      }
    }
  }
</style>
