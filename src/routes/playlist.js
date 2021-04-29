export default [
  {
    path: '/playlists/create',
    name: 'PlaylistCreate',
    component: () => import(/* webpackChunkName: "playlist_create" */ '../views/Playlist/PlaylistCreate.vue')
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
    component: () => import(/* webpackChunkName: "playlist_edit" */ '../views/Playlist/EditPlaylist.vue')
  }
]
