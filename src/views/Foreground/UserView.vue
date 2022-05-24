<template>
  <div
    class="track relative mb-4 flex rounded-lg border-2 border-black bg-white"
  >
    <div class="h-20 w-20">
      <img
        v-if="userProfile.avatar?.url"
        :src="userProfile.avatar?.url"
        class="h-full object-cover object-center"
      />
      <img
        v-else
        src="@/assets/avatars/user_default.png"
        class="h-full object-cover object-center"
      />
    </div>
    <div class="flex w-full justify-between p-4">
      <div>
        <h2>{{ userProfile.name }}</h2>
        <span>{{ userProfile.followers?.length }} 人追蹤</span>
      </div>
      <div
        class="flex items-center justify-center"
        v-if="id !== userStore.user?.id"
      >
        <button
          type="button"
          class="rounded-lg border-2 border-black px-8 py-1.5 shadow-post hover:bg-primary hover:text-white"
          :class="isFollow ? 'bg-secondary' : 'bg-warning'"
        >
          {{ isFollow ? '取消追蹤' : '追蹤' }}
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
      <PostCard :post="item" @get-posts="getPosts" />
    </li>
  </ul>
  <PostEmptyCard v-else />
</template>

<script setup>
import PostFilter from '@/components/PostFilter.vue';
import PostEmptyCard from '@/components/PostEmptyCard.vue';
import PostCard from '@/components/PostCard.vue';
import eventBus from '@/utils/eventBus';
<<<<<<< HEAD
import { useRoomStore, useUserStore } from '@/stores';
import { ref, onMounted, inject, computed } from 'vue';
=======
import { useRoomStore } from '@/stores';
import { ref, onMounted, computed } from 'vue';
>>>>>>> 09db409 (refactor/integratedAxios)
import { useRoute } from 'vue-router';
import { apiPost } from '@/utils/apiPost';
import { apiChat } from '@/utils/apiChat';
const roomStore = useRoomStore();
<<<<<<< HEAD
const userStore = useUserStore(); // 登入者資料
const axios = inject('axios'); // inject axios
const route = useRoute();
const { id } = route.params; // 個人頁 userId
=======
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
  apiPost
    .getAll(`timeSort=${sortValue}&search=${searchKey}`)
    .then((res) => {
      posts.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
>>>>>>> 09db409 (refactor/integratedAxios)

//取得聊天室id並且開啟聊天視窗
const sendMessage = async () => {
  const sendData = {
    receiver: '62834466572c43bf1eb3058b',
  };
  try {
    const res = await apiChat.room(sendData);
    const { status, roomId, name, avatar, _id } = res;
    if (status === 'success') {
      roomStore.updateRoom({ roomId, name, avatar, receiver: _id });
      eventBus.emit('handleRoom', true);
    }
  } catch (error) {
    console.log('error', error);
  }
};

// 所有貼文
const posts = ref([]);
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
// 篩選個人貼文 (註：後端出 個人貼文API 後移除)
const userPosts = computed(() => {
  return posts.value.filter((item) => item.userId[0]?._id === id);
});
onMounted(() => {
  getPosts();
});

// 個人頁資料
const userProfile = ref({});
const getUserProfile = () => {
  const url = `${API_URL}/users/${id}`;
  axios
    .get(url)
    .then((res) => {
      userProfile.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
// 是否追蹤
const isFollow = computed(() => {
  return userProfile.value.followers?.includes(userStore.user?.id);
});
onMounted(() => {
  getUserProfile();
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
