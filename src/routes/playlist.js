export default [
  {
    path: '/playlists/create',
    name: 'PlaylistCreate',
    component: () => import(/* webpackChunkName: "playlist_create" */ '../views/Playlist/PlaylistCreate.vue')
  }
]
