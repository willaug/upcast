<template>
  <div>
    <div class="photo">
      <input
        id="avatar"
        ref="avatar"
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        style="display: none"
        @change="sendImage"
      >
      <img
        v-if="photoUrl"
        :src="$api + photoUrl"
        :class="{ photoIcon: photoUrl.includes('.svg') }"
        alt="Miniatura"
      >
      <button
        v-wave
        class="button-options"
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
            @click="showOptions = !showOptions, $refs.avatar.click()"
          >
            <i class="fas fa-upload" />
            Adicionar imagem
          </li>
          <li
            v-wave
            @click="showOptions = !showOptions, deleteImage()"
          >
            <i class="fas fa-trash-alt" />
            Deletar imagem
          </li>
        </ul>
      </transition>
    </div>
    <div
      v-if="error !== null"
      class="message"
    >
      {{ error }}
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
    pushParams: {
      type: Object,
      default: null
    },
    auth: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showOptions: false,
      error: null
    }
  },
  methods: {
    sendImage (event) {
      const { $axios, $router, push, patchUrl } = this
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

      $axios.patch(patchUrl, formData, upload)
        .then(() => $router.push({ name: push }))
        .catch(err => {
          if (err.response) {
            const response = err.response.data

            this.error = response
          } else {
            this.error = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
          }
        })
    },
    deleteImage () {
      const { patchUrl, push, pushParams, auth, $axios, $router } = this
      const data = { action: 'deleteImage' }

      this.error = null

      $axios.patch(patchUrl, data, auth)
        .then(() => {
          if (pushParams !== null) {
            $router.push({ name: push, params: pushParams })
          } else {
            $router.push({ name: push })
          }
        })
        .catch(err => {
          if (err.response) {
            const response = err.response.data

            this.error = response
          } else {
            this.error = 'Ocorreu um erro de conexão. Tente novamente mais tarde!'
          }
        })
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

  .message {
    width: 100%;
    margin: 10px 0;
    border-radius: 7px;
    color: $error-color;
    font-size: 13px;
    padding: 10px;
    background: $black-color;
  }
</style>
