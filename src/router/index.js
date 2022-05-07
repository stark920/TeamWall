import { createRouter, createWebHistory } from "vue-router";
import InfoView from "../views/InfoView.vue";
import PostView from "../views/PostView.vue";
import PostNews from "../views/PostNews.vue";
import TrackList from "../views/TrackList.vue";

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
    {
      path: "/posts",
      name: "posts",
      component: PostView,
    },
    {
      path: "/track",
      name: "track",
      component: TrackList,
    },
  ],
});

export default router;
