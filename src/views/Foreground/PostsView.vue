<script setup>
import { ref, onMounted } from 'vue';
import PostCard from '@/components/PostCard.vue';
import PostFilter from '@/components/PostFilter.vue';
import PostEmptyCard from '@/components/PostEmptyCard.vue';
import { apiPost } from '@/utils/apiPost';
import PostLoadingCard from '@/components/PostLoadingCard.vue';
const isLoading = ref(true);

// 取得搜尋條件
let sort = 1; // sort: 1 最新, 2 最舊, 3 熱門
let searchKey = ''; // 關鍵字
const setSearchParams = (_sort = 1, _searchKey = '') => {
  sort = _sort;
  searchKey = _searchKey;
  getPosts();
};

// 所有貼文
const posts = ref([]);
const getPosts = () => {
  // sort: 1 最新, 2 最舊, 3 熱門
  let sortValue = 'new'; // 時間排序, 預設 最新
  let likesValue = ''; // 熱門排序, 預設 無

  if (sort === 2) sortValue = 'old';
  if (sort === 3) likesValue = 'hot';

  apiPost
    .getAll(`timeSort=${sortValue}&likesSort=${likesValue}&search=${searchKey}`)
    .then((res) => {
      isLoading.value = false;
      posts.value = res.data.data;
    })
    .catch((err) => {
      isLoading.value = false;
      console.log(err);
    });
};
onMounted(() => {
  getPosts();
});
</script>

<template>
  <PostFilter @set-params="setSearchParams" />

  <ul v-show="isLoading">
    <li v-for="index in 3" :key="index" class="mb-4">
      <PostLoadingCard />
    </li>
  </ul>

  <div v-show="!isLoading">
    <ul v-if="posts.length > 0">
      <li
        v-for="(item, index) in posts"
        :key="item.id"
        :class="{ 'mb-4': index < posts.length - 1 }"
      >
        <PostCard :post="item" @get-posts="getPosts" />
      </li>
    </ul>

    <PostEmptyCard v-else>
      <p class="p-8 text-center text-subtitle">
        目前尚無動態，新增一則貼文吧！
      </p>
    </PostEmptyCard>
  </div>
</template>
