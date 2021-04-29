export default [
  {
    path: '/shows/create',
    name: 'ShowCreate',
    component: () => import(/* webpackChunkName: "show_create" */ '../views/Show/ShowCreate.vue')
  },
  {
    path: '/shows/:show',
    name: 'Show',
    props: true,
    component: () => import(/* webpackChunkName: "show" */ '../views/Show/Show.vue')
  }
]
