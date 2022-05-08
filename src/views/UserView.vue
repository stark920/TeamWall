<template>
  <div
    class="flex border-2 border-black rounded-lg bg-white relative track mb-4"
  >
    <div class="h-20 w-20">
      <img
        src="https://randomuser.me/api/portraits/men/72.jpg"
        class="h-full object-cover object-center"
      />
    </div>
    <div class="w-full flex justify-between p-4">
      <div>
        <h2>阿爾敏</h2>
        <span>987,987 人追蹤</span>
      </div>
      <div class="flex justify-center items-center">
        <button
          type="button"
          class="px-8 py-1.5 border-2 border-black rounded-lg shadow-post hover:bg-primary hover:text-white"
          :class="isFollow ? 'bg-warning' : 'bg-secondary'"
        >
          {{ isFollow ? "追蹤" : "取消追蹤" }}
        </button>
      </div>
    </div>
  </div>
  <PostFilterVue />
  <ul>
    <li
      v-for="(item, index) in posts"
      :key="index"
      :class="{ 'mb-4': index < posts.length - 1 }"
    >
      <PostCardVue :post="item" />
    </li>
  </ul>
</template>

<script setup>
import PostFilterVue from "../components/PostFilter.vue";
import PostCardVue from "../components/PostCard.vue";

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const posts = [
  {
    _id: "aasdfasdfasdf",
    user: {
      name: "阿爾敏",
    },
    userName: "阿爾敏",
    createAt: "2022/1/10 12:00",
    content: "今天找到一張大海的照片\n 太美拉～～～",
    updateImage:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1053&q=80",
  },
  {
    _id: "akjsdfkshdkd",
    user: {
      name: "阿爾敏",
    },
    userName: "阿爾敏",
    createAt: "2022/1/10 16:00",
    content: "各位我有一個作戰計畫",
  },
];

const route = useRoute();
const id = ref(route.params.id);
console.log(id);

const isFollow = ref(true);

onMounted(() => {});
</script>

<style scoped>
.track::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 2px solid #000040;
  border-radius: 8px;
  top: 4px;
  right: 4px;
  z-index: -1;
  box-sizing: content-box;
}
</style>
