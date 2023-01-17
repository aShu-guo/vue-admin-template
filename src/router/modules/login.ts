import { RouteRecordRaw } from 'vue-router';

export const LoginRoutes = {
  Login: {
    path: '/login',
    name: 'Login',
  },
  LoginPage: {
    path: '/login/index',
    name: 'LoginIndex',
  },
} as const;

const routes: RouteRecordRaw[] = [
  {
    ...LoginRoutes.Login,
    component: () => import('/@/layouts/pure-layout/index.vue'),
    redirect: LoginRoutes.LoginPage.path,
    children: [
      {
        ...LoginRoutes.LoginPage,
        component: () => import('/@/pages/login/index.vue'),
        meta: {
          needAuth: false,
          title: '登录',
        },
      },
    ],
  },
];

export default routes;