export default [
  {
    path: '/episodes/:episode',
    name: 'Episode',
    props: true,
    component: () => import(/* webpackChunkName: "episode" */ '../views/Episode/Episode.vue')
  }
]
