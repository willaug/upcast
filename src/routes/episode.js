import Vue from 'vue'

export default [
  {
    path: '/episodes/create',
    name: 'CreateEpisode',
    component: () => import(/* webpackChunkName: "episode_create" */ '../views/Episode/CreateEpisode.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/episodes/:episode',
    name: 'Episode',
    props: true,
    component: () => import(/* webpackChunkName: "episode" */ '../views/Episode/Episode.vue')
  },
  {
    path: '/episodes/:episode/edit',
    name: 'EditEpisode',
    props: true,
    component: () => import(/* webpackChunkName: "edit_episode" */ '../views/Episode/EditEpisode.vue'),
    meta: { requiresAuth: true },
    beforeEnter: (to, from, next) => {
      const { $getUid, $axios } = Vue.prototype
      const episode = to.params.episode
      const user = $getUid()

      $axios(`/episodes/${episode}`)
        .then(result => {
          const showUid = result.data.response.show.uid

          $axios(`/shows/${showUid}`)
            .then(res => {
              const authorUid = res.data.response.author.uid

              if (authorUid === user) {
                next()
              } else {
                next({ name: 'Episode', params: { episode } })
              }
            })
            .catch(() => next({ name: 'Episode', params: { episode } }))
        })
        .catch(() => next({ name: 'Episode', params: { episode } }))
    }
  }
]
