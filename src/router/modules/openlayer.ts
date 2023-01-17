import { RouteRecordRaw } from 'vue-router';

export const OpenLayerDemoRoutes = {
  Demo: {
    path: '/open-layer',
    name: 'OpenLayer',
  },
  One: {
    path: '/open-layer/one',
    name: 'OpenLayerOne',
  },
} as const;

const routes: RouteRecordRaw[] = [
  {
    ...OpenLayerDemoRoutes.Demo,
    component: () => import('/@/layouts/pure-layout/index.vue'),
    redirect: OpenLayerDemoRoutes.One.path,
    children: [
      {
        ...OpenLayerDemoRoutes.One,
        component: () => import('/@/pages/openlayers/one.vue'),
        meta: {
          needAuth: false,
          title: '新增',
        },
      },
    ],
  },
];

export default routes;