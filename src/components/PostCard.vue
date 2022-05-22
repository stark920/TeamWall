<script setup>
import UserInfo from './UserInfo.vue';
import IconThumbsUpVue from '@/components/icons/IconThumbsUp.vue';
import AvatarVue from './Avatar.vue';

defineProps({
  post: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>

<template>
  <div class="rounded-lg border-2 border-black bg-white p-6">
    <UserInfo
      class="mb-4"
      :imgUrl="post.userId?.avatar"
      :name="post.userId?.name"
      :userPageUrl="`/user/${post.userId?._id}`"
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
      <button type="button" class="flex items-center justify-center py-5">
        <IconThumbsUpVue class="mr-2 h-5 w-5 text-primary" />
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
