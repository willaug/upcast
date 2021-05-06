import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Account from './account'
import Show from './show'
import Episode from './episode'
import Playlist from './playlist'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "index" */ '../views/Home.vue')
  },
  {
    path: '/explore',
    name: 'Explore',
    component: () => import(/* webpackChunkName: "explore" */ '../views/Explore.vue')
  },
  {
    path: '/search',
    name: 'Search',
    props: true,
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/categories/:category',
    name: 'Category',
    props: true,
    component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue')
  },
  {
    path: '/users/:user',
    name: 'User',
    props: true,
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
  },
  ...Account,
  ...Show,
  ...Episode,
  ...Playlist,
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('TokenIsValid').then(continueRoute => {
      if (continueRoute) {
        next()
      } else {
        next({ name: 'SignIn' })
      }
    })
  } else if (to.matched.some(record => record.meta.notAuth)) {
    store.dispatch('TokenIsValid').then(continueRoute => {
      if (continueRoute) {
        next({ name: 'Account' })
      } else {
        next()
      }
    })
  } else {
    next()
  }
})

export default router
