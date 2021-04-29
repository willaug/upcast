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
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "account" */ '../views/Account/Account.vue')
  },
  {
    path: '/account/edit',
    name: 'EditAccount',
    component: () => import(/* webpackChunkName: "edit_account" */ '../views/Account/EditAccount.vue')
  }
]
