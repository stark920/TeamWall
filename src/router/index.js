import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import PostsView from '../views/Foreground/PostsView.vue';
import RegisterView from '@/views/RegisterView.vue';

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
          component: PostsView,
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
      path: '/chat-room',
      name: 'chat-room',
      component: () => import('../views/Foreground/ChatRoomView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
});

export default router;
