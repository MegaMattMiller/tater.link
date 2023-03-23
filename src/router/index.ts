/* eslint-disable prettier/prettier */
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/HomeView.vue'),
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
    {
      path: '/register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/sign-in',
      component: () => import('@/views/SignInView.vue'),
    },
    {
      path: '/edit',
      component: () => import('@/views/EditView.vue'),
    },
  ],
});

export default router;
