export default [
  {
    path: '/shows/:show',
    name: 'Show',
    props: true,
    component: () => import(/* webpackChunkName: "show" */ '../views/Show/Show.vue')
  }
]
