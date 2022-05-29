<script setup>
import UserInfo from './UserInfo.vue';
import IconThumbsUpVue from '@/components/icons/IconThumbsUp.vue';
import IconThumbsUpFillVue from '@/components/icons/IconThumbsUpFill.vue';
import AvatarVue from './Avatar.vue';
import PostImagesCardVue from './PostImagesCard.vue';
import { ref, toRaw, watch } from 'vue';
import { apiLike } from '../utils/apiLike';
import { apiPost } from '@/utils/apiPost';
import { useUserStore } from '@/stores';
const userStore = useUserStore();
const isLoading = ref(false);

const props = defineProps({
  post: {
    type: Object,
    default() {
      return {};
    },
  },
});

const innerPost = ref(toRaw(props.post));
watch(props, (curr) => {
  innerPost.value = toRaw(curr.post);
});

// 按讚貼文
const likePost = (postId) => {
  const data = { posts: postId };
  isLoading.value = true;
  apiLike
    .toggle(data)
    .then(() => {
      getPost(postId); // 更新貼文
    })
    .catch((err) => {
      isLoading.value = false;
      console.log(err);
    });
};

// 取得單筆貼文(更新貼文)
const getPost = (postId) => {
  isLoading.value = true;
  apiPost
    .getOne(postId)
    .then((res) => {
      const [post] = res.data.data; // 回傳是陣列
      console.log('更新的post:', post);
      innerPost.value = post;
      isLoading.value = false;
    })
    .catch((err) => {
      isLoading.value = false;
      console.log(err);
    });
};
</script>

<template>
  <div
    class="rounded-lg border-2 border-black bg-white p-6 shadow-post"
    :class="{ 'animate-pulse': isLoading }"
  >
    <UserInfo
      class="mb-4"
      :imgUrl="innerPost.userId?.avatar?.url"
      :name="innerPost.userId?.name"
      :userPageUrl="`/profile/${innerPost.userId?._id}`"
      :subTitle="$filters.dateTime(innerPost.createdAt)"
    />
    <p class="mb-4 whitespace-pre">{{ innerPost.content }}</p>
    <PostImagesCardVue
      v-if="innerPost.image?.length > 0"
      :images="innerPost.image"
    />
    <div>
      <button
        type="button"
        class="flex items-center justify-center py-5"
        @click="likePost(innerPost._id)"
        :disabled="isLoading"
        :class="{ 'cursor-not-allowed': isLoading }"
      >
        <IconThumbsUpVue
          v-if="!innerPost.likes?.includes(userStore.user.id)"
          class="mr-2 h-5 w-5 text-primary"
        />
        <IconThumbsUpFillVue v-else class="mr-2 h-5 w-5 text-primary" />
        <span> {{ innerPost.likes?.length }}</span>
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
      v-for="(comment, index) in innerPost.comments"
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
