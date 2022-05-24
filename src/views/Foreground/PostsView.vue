<script setup>
import { ref, onMounted, inject } from 'vue';
import PostCard from '@/components/PostCard.vue';
import PostFilter from '@/components/PostFilter.vue';
import PostNoneCard from '@/components/PostNoneCard.vue';
import { API_URL } from '@/global/constant';
const axios = inject('axios'); // inject axios

const posts = ref([]);

const getPosts = (sort = 1, searchKey = '') => {
  // sort=1 最新貼文, sort=2 最舊貼文

  let sortValue = 'desc'; // 預設 desc
  if (sort === 2) {
    sortValue = 'asc';
  }
  axios
    .get(`${API_URL}/posts?timeSort=${sortValue}&search=${searchKey}`)
    .then((res) => {
      posts.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getPosts();
});
</script>

<template>
  <PostFilter @get-posts="getPosts" />
  <ul v-if="posts.length > 0">
    <li
      v-for="(item, index) in posts"
      :key="item.id"
      :class="{ 'mb-4': index < posts.length - 1 }"
    >
      <PostCard :post="item" @get-posts="getPosts" />
    </li>
  </ul>
  <PostNoneCard v-else />
</template>
