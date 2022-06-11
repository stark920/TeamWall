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

const isSendingLike = ref(false);

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

const innerComments = ref(innerPost.value.comments);
const isGettingComments = ref(false);
const displayComments = ref(false);

const isSendingComment = ref(false);
const newComment = ref('');

// 按讚貼文
const likePost = (id) => {
  isSendingLike.value = true;
  const data = { posts: id };
  apiLike
    .toggle(data)
    .then(() => {
      updateInnerPostLikes(userStore.user.id);
      isSendingLike.value = false;
    })
    .catch(() => {
      toast.error('連線異常，請稍後再試');
      isSendingLike.value = false;
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

const getComments = (postID) => {
  if (isGettingComments.value) {
    return;
  }
  isGettingComments.value = true;

  apiComment
    .get(postID)
    .then((res) => {
      innerComments.value = res.data.data;
      displayComments.value = true;
      isGettingComments.value = false;
    })
    .catch(() => {
      toast.error('取得留言失敗，請稍後再試');
      isGettingComments.value = false;
    });
};

const sendComment = (postID) => {
  if (newComment.value.trim() === '') {
    toast.error('您尚未輸入任何訊息');
    return;
  }
  isSendingComment.value = true;
  apiComment
    .send(postID, { content: newComment.value })
    .then((res) => {
      updateInnerPostComments(res.data.data);
      toast.success('新增留言成功');
      newComment.value = '';
      isSendingComment.value = false;
    })
    .catch(() => {
      toast.error('留言失敗，請稍後再試');
      isSendingComment.value = false;
    });
};

const updateInnerPostComments = (data) => {
  const comment = {
    content: data.content,
    userId: {
      _id: data.userId._id,
      name: data.userId.name,
      avatar: {
        url: data.userId.avatar.url,
      },
    },
    createdAt: data.createdAt,
  };
  innerComments.value.push(comment);
};

const sortedComments = computed(() => {
  const comments = innerComments.value;
  return comments.sort((a, b) => {
    const dateTime1 = new Date(a.createdAt);
    const dateTime2 = new Date(b.createdAt);
    return dateTime1 - dateTime2;
  });
});
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
    <p class="mb-4 whitespace-pre-wrap">{{ innerPost.content }}</p>
    <PostImagesCardVue
      v-if="innerPost.image?.length > 0"
      :images="innerPost.image"
    />
    <div>
      <button
        type="button"
        class="flex items-center justify-center py-5"
        @click="likePost(innerPost._id)"
        :disabled="isSendingLike"
        :class="{ 'cursor-not-allowed': isSendingLike }"
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
    <div
      class="mb-5 flex items-center"
      @keyup.enter.exact="sendComment(innerPost._id)"
    >
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
          :disabled="isSendingComment"
          :class="{ 'cursor-not-allowed bg-slate-500': isSendingComment }"
        >
          <span>留言</span>
          <IconLoading
            class="ml-1 h-4 w-4 animate-spin"
            :class="{ hidden: !isSendingComment }"
          ></IconLoading>
        </button>
      </div>
    </div>
    <div
      v-show="innerPost.commentsNum > 1 && !displayComments"
      class="mb-4 inline-flex cursor-pointer items-center font-bold text-primary hover:underline"
      @click="getComments(innerPost._id)"
    >
      <span>查看其他 {{ innerPost.commentsNum - 1 }} 則較早留言</span>
      <IconLoading
        v-show="isGettingComments"
        class="ml-1 h-4 w-4 animate-spin"
      ></IconLoading>
    </div>
    <div
      class="mb-4 rounded-lg bg-secondary p-4"
      v-for="comment in sortedComments"
      :key="comment._id"
    >
      <UserInfo
        class="mb-4"
        :imgUrl="comment.userId.avatar.url ?? comment.userId.avatar"
        :name="comment.userId.name"
        :userPageUrl="`/profile/${comment.userId._id}`"
        :subTitle="toLocaleDate(comment.createdAt)"
      />
      <p class="whitespace-pre">{{ comment.content }}</p>
    </div>
  </div>
</template>
