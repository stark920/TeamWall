import { createRouter, createWebHashHistory } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: '/',
          name: 'posts',
          component: () => import('../views/Foreground/PostsView.vue'),
        },
        {
          path: '/post/:id',
          name: 'post',
          component: () => import('../views/Foreground/PostView.vue'),
        },
        {
          path: '/post-create',
          name: 'post-create',
          component: () => import('../views/Foreground/PostCreateView.vue'),
        },
        {
          path: '/follow',
          name: 'follow',
          component: () => import('../views/Foreground/FollowListView.vue'),
        },
        {
          path: '/likes',
          name: 'likes',
          component: () => import('../views/Foreground/LikesView.vue'),
        },
        {
          path: '/profile/:id',
          name: 'profile',
          component: () => import('../views/Foreground/UserView.vue'),
        },
        {
          path: '/profile/settings',
          name: 'profile-settings',
          component: () => import('../views/Foreground/UserSettingsView.vue'),
        },
        {
          path: '/chat-room-list',
          name: 'chat-room-list',
          component: () => import('../views/Foreground/ChatRoomListView.vue'),
        },
      ],
    },
    {
      path: '/user',
      component: LoginView,
      children: [
        {
          path: '/sign-in',
          name: 'sign-in',
          component: () => import('../views/Foreground/SignInView.vue'),
        },
        {
          path: '/sign-up',
          name: 'sign-up',
          component: () => import('../views/Foreground/SignUpView.vue'),
        },
      ],
    },
    {
      path: '/chat-room',
      name: 'chat-room',
      component: () => import('../views/Foreground/ChatRoomView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      redirect: { name: 'sign-in' },
    },
  ],
});

export default router;
