import Vue from 'vue'

export default [
  {
    path: '/playlists/create',
    name: 'CreatePlaylist',
    component: () => import(/* webpackChunkName: "playlist_create" */ '../views/Playlist/CreatePlaylist.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/playlists/:playlist',
    name: 'Playlist',
    props: true,
    component: () => import(/* webpackChunkName: "playlist" */ '../views/Playlist/Playlist.vue')
  },
  {
    path: '/playlists/:playlist/edit',
    name: 'EditPlaylist',
    props: true,
    component: () => import(/* webpackChunkName: "playlist_edit" */ '../views/Playlist/EditPlaylist.vue'),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const { $getUid, $axios } = Vue.prototype
      const playlist = to.params.playlist
      const user = $getUid()

      $axios(`/playlists/${playlist}`)
        .then(result => {
          const playlistFound = result.data.response

          if (playlistFound.author.uid === user) {
            next()
          } else {
            next({ name: 'Playlist', params: { playlist } })
          }
        })
        .catch(() => next({ name: 'Playlist', params: { playlist } }))
    }
  }
]
