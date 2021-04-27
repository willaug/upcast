export default [
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Account/SignUp.vue')
  },
  {
    path: '/login',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Account/SignIn.vue')
  }
]
