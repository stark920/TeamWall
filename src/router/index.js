import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PostsView from '../views/Foreground/PostsView.vue';
import LoginView from '@/views/LoginView.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
      children: [
        {
          path: '/',
          name: 'posts',
          component: PostsView,
        },
        {
          path: '/post/:id',
          name: 'post',
          component: () => import('../views/Foreground/PostView.vue'),
        },
        {
          path: '/post-news',
          name: 'post-news',
          component: () => import('../views/Foreground/PostNews.vue'),
        },
        {
          path: '/track',
          name: 'track',
          component: () => import('../views/Foreground/TrackList.vue'),
        },
        {
          path: '/likes',
          name: 'likes',
          component: () => import('../views/Foreground/LikesView.vue'),
        },
        {
          path: '/user/settings',
          name: 'user-settings',
          component: () => import('../views/Foreground/Settings.vue'),
        },
        {
          path: '/user/:id',
          name: 'user-profile',
          component: () => import('../views/Foreground/UserView.vue'),
        },
        {
          path: '/chat-room-list',
          name: 'chat-room-list',
          component: () => import('../views/Foreground/ChatRoomList.vue'),
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
  ],
});

export default router;
