import Vue from 'vue'

export default [
  {
    path: '/shows/create',
    name: 'CreateShow',
    component: () => import(/* webpackChunkName: "show_create" */ '../views/Show/CreateShow.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/shows/:show',
    name: 'Show',
    props: true,
    component: () => import(/* webpackChunkName: "show" */ '../views/Show/Show.vue')
  },
  {
    path: '/shows/:show/edit',
    name: 'EditShow',
    props: true,
    component: () => import(/* webpackChunkName: "edit_show" */ '../views/Show/EditShow.vue'),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const { $getUid, $axios } = Vue.prototype
      const show = to.params.show
      const user = $getUid()

      $axios(`/shows/${show}`)
        .then(result => {
          const showFound = result.data.response

          if (showFound.author.uid === user) {
            next()
          } else {
            next({ name: 'Show', params: { show } })
          }
        })
        .catch(() => next({ name: 'Show', params: { show } }))
    }
  }
]
