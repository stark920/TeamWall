<script setup>
import { ref, onMounted, inject } from 'vue';
import UserInfo from './UserInfo.vue';
import IconThumbsUpVue from '@/components/icons/IconThumbsUp.vue';
import IconThumbsUpFillVue from '@/components/icons/IconThumbsUpFill.vue';
import AvatarVue from './Avatar.vue';
import { API_URL } from '@/global/constant';

const id = ref('6289cb654896923f8331bc15'); // 登入 userId
const axios = inject('axios');

const props = defineProps({
  post: {
    type: Object,
    default() {
      return {};
    },
  },
});
const emit = defineEmits(['get-posts']);

const user = ref({});
onMounted(() => {
  user.value = props.post.userId[0] ? props.post.userId[0] : {}; // post.userId 回傳為陣列, 取第一筆資料
});

const likePost = (postId) => {
  const data = { posts: postId };
  axios
    .post(`${API_URL}/likes/likePost`, data)
    .then(() => {
      emit('get-posts');
    })
    .catch((err) => {
      console.log(err);
    });
};
</script>

<template>
  <div class="rounded-lg border-2 border-black bg-white p-6 shadow-post">
    <UserInfo
      class="mb-4"
      :imgUrl="user?.avatar?.url"
      :name="user?.name"
      :userPageUrl="`/user/${user?._id}`"
      :subTitle="post.createAt"
    />
    <p class="mb-4 whitespace-pre">{{ post.content }}</p>
    <img
      class="max-h-96 w-full rounded-lg border-2 border-black object-cover object-center"
      v-if="post.updateImage"
      :src="post.updateImage"
      alt="貼文圖片"
    />
    <div>
      <button
        type="button"
        class="flex items-center justify-center py-5"
        @click="likePost(post._id)"
      >
        <!-- 已按讚 icon, 改實心 -->
        <IconThumbsUpVue
          v-if="!post.likes?.includes(id)"
          class="mr-2 h-5 w-5 text-primary"
        />
        <IconThumbsUpFillVue v-else class="mr-2 h-5 w-5 text-primary" />
        <span> {{ post.likes?.length }}</span>
      </button>
    </div>
    <!--留言-->
    <div class="mb-5 flex items-center">
      <AvatarVue
        class="mx-2"
        size="40"
        :imgUrl="'https://i.pravatar.cc/150?img=19'"
      />
      <div class="flex w-full">
        <input class="w-full border-2 border-black" type="text" />
        <button
          class="inline-block w-full max-w-[128px] border-2 border-black bg-primary text-base text-white"
        >
          留言
        </button>
      </div>
    </div>
    <div
      class="mb-4 rounded-lg bg-secondary px-4 py-5"
      v-for="(comment, index) in post.comments"
      :key="index"
    >
      <UserInfo
        class="mb-4"
        :imgUrl="comment.avatar"
        :name="comment.userName"
        userPageUrl="#"
        :subTitle="comment.createAt"
      />
      <p class="mb-4 whitespace-pre">{{ comment.content }}</p>
    </div>
  </div>
</template>
