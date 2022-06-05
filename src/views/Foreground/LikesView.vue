<script setup>
import CardTitle from '@/components/CardTitle.vue';
import LikeCard from '@/components/LikeCard.vue';
import LikeLoadingCard from '@/components/LikeLoadingCard.vue';
import PostEmptyCard from '@/components/PostEmptyCard.vue';
import { ref, onMounted } from 'vue';
import { apiLike } from '@/utils/apiLike';
import { useToast } from 'vue-toastification';
const toast = useToast();

const isLoading = ref(false);
const likePosts = ref([]);

const getLikes = () => {
  isLoading.value = true;
  apiLike
    .getAll()
    .then((res) => {
      if (res.data.data) {
        likePosts.value = res.data.data.posts;
        isLoading.value = false;
      }
    })
    .catch(() => {
      toast.error('讀取按讚列表失敗');
      isLoading.value = false;
    });
};

onMounted(() => {
  getLikes();
});
</script>

<template>
  <CardTitle title="我按讚的貼文" />

  <ul v-show="isLoading">
    <li v-for="index in 3" :key="index" class="mb-4">
      <LikeLoadingCard />
    </li>
  </ul>
  <div v-show="!isLoading">
    <ul v-if="likePosts.length > 0">
      <li
        v-for="(item, index) in likePosts"
        :key="item._id"
        :class="{ 'mb-2': index < likePosts.length - 1 }"
      >
        <LikeCard :item="item" @get-likes="getLikes" />
      </li>
    </ul>
    <PostEmptyCard v-else>
      <p class="p-8 text-center text-subtitle">
        目前尚無按讚文章，按讚一則貼文吧！
      </p>
    </PostEmptyCard>
  </div>
</template>
