export default [
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Account/SignUp.vue'),
    meta: { notAuth: true }
  },
  {
    path: '/login',
    name: 'SignIn',
    component: () => import(/* webpackChunkName: "signup" */ '../views/Account/SignIn.vue'),
    meta: { notAuth: true }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "account" */ '../views/Account/Account.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/account/edit',
    name: 'EditAccount',
    component: () => import(/* webpackChunkName: "edit_account" */ '../views/Account/EditAccount.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/password-reset',
    name: 'PasswordReset',
    component: () => import(/* webpackChunkName: "password-reset" */ '../views/Account/PasswordReset/PasswordReset.vue'),
    meta: { notAuth: true }
  },
  {
    path: '/password-reset/:passwordReset',
    name: 'AddNewPassword',
    props: true,
    component: () => import(/* webpackChunkName: "add_new_password" */ '../views/Account/PasswordReset/AddNewPassword.vue'),
    meta: { notAuth: true }
  }
]
