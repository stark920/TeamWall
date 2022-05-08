<template>
  <div
    class="track relative mb-4 flex rounded-lg border-2 border-black bg-white"
  >
    <div class="h-20 w-20">
      <img
        src="https://randomuser.me/api/portraits/men/72.jpg"
        class="h-full object-cover object-center"
      />
    </div>
    <div class="flex w-full justify-between p-4">
      <div>
        <h2>阿爾敏</h2>
        <span>987,987 人追蹤</span>
      </div>
      <div class="flex items-center justify-center">
        <button
          type="button"
          class="rounded-lg border-2 border-black px-8 py-1.5 shadow-post hover:bg-primary hover:text-white"
          :class="isFollow ? 'bg-warning' : 'bg-secondary'"
        >
          {{ isFollow ? '追蹤' : '取消追蹤' }}
        </button>
      </div>
    </div>
  </div>
  <PostFilter />
  <ul>
    <li
      v-for="(item, index) in posts"
      :key="index"
      :class="{ 'mb-4': index < posts.length - 1 }"
    >
      <PostCard :post="item" />
    </li>
  </ul>
</template>

<script setup>
import PostFilter from '@/components/PostFilter.vue';
import PostCard from '@/components/PostCard.vue';

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const posts = [
  {
    _id: 'aasdfasdfasdf',
    user: {
      name: '阿爾敏',
    },
    userName: '阿爾敏',
    createAt: '2022/1/10 12:00',
    content: '今天找到一張大海的照片\n 太美拉～～～',
    updateImage:
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1053&q=80',
  },
  {
    _id: 'akjsdfkshdkd',
    user: {
      name: '阿爾敏',
    },
    userName: '阿爾敏',
    createAt: '2022/1/10 16:00',
    content: '各位我有一個作戰計畫',
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
  content: '';
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
