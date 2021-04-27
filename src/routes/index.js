import Vue from 'vue'
import VueRouter from 'vue-router'
import Account from './account'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "index" */ '../views/Home.vue')
  },
  ...Account
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
