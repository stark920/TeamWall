<script setup>
import { ref, onMounted, inject } from 'vue';
import { useRoute } from 'vue-router';
import { API_URL } from '@/global/constant';
import PostCard from '@/components/PostCard.vue';
const route = useRoute();
const id = ref(route.params.id);

const axios = inject('axios'); // inject axios

const post = ref([]);

const getPost = () => {
  axios
    .get(`${API_URL}/posts/${id.value}`)
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
