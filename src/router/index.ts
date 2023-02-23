/* eslint-disable prettier/prettier */
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: to => {
        return { path: '/tater'}
      },
    },
    {
      path: '/nouser',
      name: 'nouser',
      component: () => import('@/views/NotFoundView.vue'),
    },
    {
      path: '/:username',
      name: 'card',
      component: () => import('@/views/CardView.vue'),
    },
  ],
});

export default router;
