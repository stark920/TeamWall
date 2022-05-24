<script setup>
import { ref, onMounted } from 'vue';
import { apiPost } from '@/utils/apiPost';
import { useRoute } from 'vue-router';
import PostCard from '@/components/PostCard.vue';
const route = useRoute();

const id = ref(route.params.id);
const post = ref([]);

const getPost = () => {
  apiPost
    .getOne(id.value)
    .then((res) => {
      [post.value] = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

onMounted(() => {
  getPost();
});
</script>

<template>
  <PostCard :post="post" @get-posts="getPost" />
</template>
