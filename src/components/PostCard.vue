<script setup>
import UserInfo from './UserInfo.vue';
import IconLoading from './icons/IconLoading.vue';
import IconThumbsUp from '@/components/icons/IconThumbsUp.vue';
import IconThumbsUpFill from '@/components/icons/IconThumbsUpFill.vue';
import AvatarVue from './Avatar.vue';
import PostImagesCardVue from './PostImagesCard.vue';
import { ref, toRaw, watch, computed } from 'vue';
import { apiLike } from '../utils/apiLike';
import { apiComment } from '../utils/apiComment';
import { useUserStore } from '@/stores';
import { useToast } from 'vue-toastification';
import { toLocaleDate } from '../utils/filter';
const toast = useToast();
const userStore = useUserStore();
const isSending = ref(false);
const newComment = ref('');

const props = defineProps({
  post: {
    type: Object,
    default: () => {},
  },
});

const innerPost = ref(toRaw(props.post));
watch(props, (curr) => {
  innerPost.value = toRaw(curr.post);
});

const innerComments = computed(() => {
  const comments = innerPost.value.comments;
  return comments.sort((a, b) => {
    const dateTime1 = new Date(a.createdAt);
    const dateTime2 = new Date(b.createdAt);
    return dateTime1 - dateTime2;
  });
});

// 按讚貼文
const likePost = (id) => {
  isSending.value = true;
  const data = { posts: id };
  apiLike
    .toggle(data)
    .then(() => {
      updateInnerPostLikes(userStore.user.id);
      isSending.value = false;
    })
    .catch(() => {
      toast.error('連線異常，請稍後再試');
      isSending.value = false;
    });
};

// 更新內部資料 innerPost.likes
const updateInnerPostLikes = (id) => {
  const isLike = innerPost.value.likes.includes(id); // 是否按讚
  if (isLike) {
    const index = innerPost.value.likes.findIndex((i) => i === id);
    innerPost.value.likes.splice(index, 1); // 移除 id
  } else {
    innerPost.value.likes.push(id); // 加入 id
  }
};

const sendComment = (postID) => {
  if (newComment.value.trim() === '') {
    toast.error('您尚未輸入任何訊息');
    return;
  }
  isSending.value = true;
  apiComment
    .send(postID, { content: newComment.value })
    .then((res) => {
      updateInnerPostComments(res.data.data);
      toast.success('新增留言成功');
      isSending.value = false;
    })
    .catch(() => {
      toast.error('留言失敗，請稍後再試');
      isSending.value = false;
    });
};

const updateInnerPostComments = (data) => {
  const comment = {
    content: data.content,
    userId: {
      _id: data.userId._id,
      name: data.userId.name,
      avatar: data.userId.avatar.url,
    },
    createdAt: data.createdAt,
  };
  innerPost.value.comments.push(comment);
};
</script>

<template>
  <div class="rounded-lg border-2 border-black bg-white p-6 shadow-post">
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
        :disabled="isSending"
        :class="{ 'cursor-not-allowed': isSending }"
      >
        <IconThumbsUp
          v-if="!innerPost.likes?.includes(userStore.user.id)"
          class="mr-2 h-5 w-5 text-primary"
        />
        <IconThumbsUpFill v-else class="mr-2 h-5 w-5 text-primary" />
        <span> {{ innerPost.likes?.length }}</span>
      </button>
    </div>
    <!--留言-->
    <div class="mb-5 flex items-center">
      <AvatarVue class="mx-2" size="40" :imgUrl="userStore.user.avatar" />
      <div class="flex w-full border-2 border-black">
        <input
          v-model="newComment"
          class="w-full border-none focus:ring-2 focus:ring-primary"
          type="text"
        />
        <button
          class="flex w-full max-w-[128px] items-center justify-center border-l-2 border-black bg-primary text-base text-white"
          @click="sendComment(innerPost._id)"
          :disabled="isSending"
          :class="{ 'cursor-not-allowed bg-slate-500': isSending }"
        >
          <span>留言</span>
          <IconLoading
            class="ml-1 h-4 w-4 animate-spin"
            :class="{ hidden: !isSending }"
          ></IconLoading>
        </button>
      </div>
    </div>
    <div
      class="mb-4 rounded-lg bg-secondary px-4 py-5"
      v-for="comment in innerComments"
      :key="comment._id"
    >
      <UserInfo
        class="mb-4"
        :imgUrl="comment.userId.avatar"
        :name="comment.userId.name"
        :userPageUrl="`/profile/${comment.userId._id}`"
        :subTitle="toLocaleDate(comment.createdAt)"
      />
      <p class="mb-4 whitespace-pre">{{ comment.content }}</p>
    </div>
  </div>
</template>
