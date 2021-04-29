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
  },
  {
    path: '/password-reset',
    name: 'PasswordReset',
    component: () => import(/* webpackChunkName: "password-reset" */ '../views/PasswordReset/PasswordReset.vue')
  },
  {
    path: '/password-reset/:passwordReset',
    name: 'AddNewPassword',
    props: true,
    component: () => import(/* webpackChunkName: "add_new_password" */ '../views/PasswordReset/AddNewPassword.vue')
  }
]
