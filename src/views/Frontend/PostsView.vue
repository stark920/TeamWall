<template>
  <div class="grid md:grid-cols-3 gap-x-3 gap-y-1.5 mb-4">
    <div>
      <select class="w-full h-11 border-2 border-black" name="category">
        <option value="newest" selected>最新貼文</option>
        <option value="popular">熱門貼文</option>
      </select>
    </div>
    <div class="md:col-span-2">
      <div class="flex h-11 border-2 border-black">
        <input
          class="w-full border-0"
          type="text"
          placeholder="搜尋貼文"
          v-model.trim="searchKey"
        />
        <button
          type="button"
          class="bg-primary w-11 flex justify-center items-center border-l-2 border-black"
        >
          <IconSearchVue class="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  </div>
  <ul>
    <li v-for="item in filterPosts" :key="item.id">
      <PostCardVue :post="item" />
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted, inject, computed } from "vue";
import IconSearchVue from "../../components/icons/IconSearch.vue";
import PostCardVue from "../../components/PostCard.vue";

const axios = inject("axios"); // inject axios
const posts = ref([]);
const searchKey = ref("");

function getPosts() {
  axios
    .get("https://teamwork02.herokuapp.com/posts")
    .then((res) => {
      posts.value = res.data.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

// 篩選貼文
const filterPosts = computed(() => {
  const str = searchKey.value.trim().toLocaleLowerCase();
  const newPosts = posts.value.filter((item) => {
    // 搜尋條件: 姓名 or 貼文有符合關鍵字
    return item.userName.match(str) || item.content.match(str);
  });
  return newPosts;
});

onMounted(() => {
  getPosts();
});
</script>
