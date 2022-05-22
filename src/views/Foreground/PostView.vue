<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';
import PostCard from '@/components/PostCard.vue';
const route = useRoute();
const id = ref(route.params.id);

const axios = inject('axios'); // inject axios
const baseUrl = 'http://127.0.0.1:3000';

const post = ref([]);

const getPost = () => {
  axios
    .get(`${baseUrl}/posts/${id.value}`)
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
  <PostCard :post="post" />
</template>
