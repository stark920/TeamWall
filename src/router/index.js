import { createRouter, createWebHistory } from "vue-router";
import InfoView from "../views/InfoView.vue";
import PostNews from "../views/PostNews.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "project-info",
      component: InfoView,
    },
    {
      path: "/post-news",
      name: "post-news",
      component: PostNews,
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import("../views/AboutView.vue"),
    // },
  ],
});

export default router;
