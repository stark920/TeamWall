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
        <button
          @click="sendMessage"
          class="ml-2 rounded-lg border-2 border-black px-8 py-1.5 shadow-post"
        >
          傳送訊息
        </button>
      </div>
    </div>
  </div>
  <PostFilter @get-posts="getPosts" />
  <ul v-if="userPosts.length > 0">
    <li
      v-for="(item, index) in userPosts"
      :key="index"
      :class="{ 'mb-4': index < userPosts.length - 1 }"
    >
      <PostCard :post="item" />
    </li>
  </ul>
  <PostNoneCard v-else />
</template>

<script setup>
import PostFilter from '@/components/PostFilter.vue';
import PostNoneCard from '@/components/PostNoneCard.vue';
import PostCard from '@/components/PostCard.vue';
import eventBus from '@/utils/eventBus';
import { useRoomStore } from '@/stores';
import { ref, onMounted, inject, computed } from 'vue';
import { useRoute } from 'vue-router';
import { API_URL } from '@/global/constant';
const roomStore = useRoomStore();
const axios = inject('axios'); // inject axios
const route = useRoute();
const id = ref(route.params.id);
const posts = ref([]);

const isFollow = ref(true);
const getPosts = (sort = 1, searchKey = '') => {
  // sort=1 最新貼文, sort=2 最舊貼文

  let sortValue = 'desc'; // 預設 desc
  if (sort === 2) {
    sortValue = 'asc';
  }
  const url = `${API_URL}/posts?timeSort=${sortValue}&search=${searchKey}`;
  axios
    .get(url)
    .then((res) => {
      posts.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

//取得聊天室id並且開啟聊天視窗
const sendMessage = async () => {
  const sendData = {
    receiver: '62834466572c43bf1eb3058b',
  };
  try {
    const res = await axios.post(`${API_URL}/chat/room-info`, sendData);
    const { status, roomId, name, avatar, _id } = res;
    if (status === 'success') {
      roomStore.updateRoom({ roomId, name, avatar, receiver: _id });
      eventBus.emit('handleRoom', true);
    }
  } catch (error) {
    console.log('error', error);
  }
};

// 篩選個人貼文 (註：後端出 個人貼文API 後移除)
const userPosts = computed(() => {
  return posts.value.filter((item) => item.userId?._id === id.value);
});

onMounted(() => {
  getPosts();
});
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
