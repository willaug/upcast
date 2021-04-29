export default [
  {
    path: '/episodes/create',
    name: 'EpisodeCreate',
    component: () => import(/* webpackChunkName: "episode_create" */ '../views/Episode/EpisodeCreate.vue')
  },
  {
    path: '/episodes/:episode',
    name: 'Episode',
    props: true,
    component: () => import(/* webpackChunkName: "episode" */ '../views/Episode/Episode.vue')
  }
]
