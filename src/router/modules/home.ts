import { RouteRecordRaw } from 'vue-router';
import BizIcons from '/@/components/biz-icons/index.vue';
import { Collections } from '/@/components/biz-icons/collections';
import { RouterExtra } from '/@/router/types';

export const HomeRoutes: RouterExtra = {
  HomeIndex: {
    path: '/home/index',
    name: 'HomeIndex',
  },
};

const routes: RouteRecordRaw[] = [
  {
    ...HomeRoutes.HomeIndex,
    component: () => import('/@/pages/home/index.vue'),
    meta: {
      title: '首页',
      modifier: 'some',
      roles: ['admin', 'staff'],
      icon: h(BizIcons, { type: Collections.Home }),
    },
  },
];

export default routes;
