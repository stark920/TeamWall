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
import { useRoomStore, useUserStore } from '@/stores';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { apiChat } from '@/utils/apiChat';
import { apiPost } from '@/utils/apiPost';
import { apiUser } from '@/utils/apiUser';
const roomStore = useRoomStore();
const userStore = useUserStore(); // 登入者資料
const route = useRoute();
const id = ref(route.params.id); // 個人頁 userId
const pending = ref(false);

//取得聊天室id並且開啟聊天視窗
const sendMessage = async () => {
  if (pending.value) return;
  const sendData = {
    receiver: '628e374ac1d659be9f498563',
  };
  try {
    pending.value = true;
    const res = await apiChat.room(sendData);
    const {
      data: { status, roomId, name, avatar, _id },
    } = res;
    if (status) {
      roomStore.updateRoom({ roomId, name, avatar, receiver: _id });
      eventBus.emit('handleRoom', true);
    }
  } catch (error) {
    console.log('error', error);
  } finally {
    pending.value = false;
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

  apiPost
    .getAll(`timeSort=${sortValue}&search=${searchKey}`)
    .then((res) => {
      posts.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// 篩選個人貼文 (註：後端出 個人貼文API 後移除)
const userPosts = computed(() => {
  return posts.value.filter((item) => item.userId?._id === id.value);
});
onMounted(() => {
  getPosts();
});

// 個人頁資料
const userProfile = ref({});
const getUserProfile = () => {
  apiUser
    .getProfile(id.value)
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

// 相同路由 /profile/:id, id 參數切換
watch(route, (curr) => {
  if (curr.name === 'profile' && curr.params.id) {
    id.value = curr.params.id;
    getPosts();
    getUserProfile();
  }
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
