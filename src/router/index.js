import { createRouter, createWebHistory } from "vue-router";
import InfoView from "../views/InfoView.vue";
import PostNews from "../views/Frontend/PostNews.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "project-info",
      component: InfoView,
    },
    {
      path: "/front",
      name: "frontend",
      component: () => import("../views/Frontend/FrontendView.vue"),
      children: [
        {
          path: "post-news",
          name: "post-news",
          component: PostNews,
        },
        {
          path: "posts",
          name: "posts",
          component: () => import("../views/Frontend/PostsView.vue"),
        },
      ],
    },
  ],
});

export default router;
