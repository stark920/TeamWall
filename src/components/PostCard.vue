<script setup>
import UserInfo from './UserInfo.vue';

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
      :imgUrl="post.avatar"
      :name="post.userName"
      userPageUrl="#"
      :subTitle="post.createAt"
    />
    <p class="mb-4 whitespace-pre">{{ post.content }}</p>
    <img
      class="max-h-96 w-full rounded-lg border-2 border-black object-cover object-center"
      v-if="post.updateImage"
      :src="post.updateImage"
      alt="貼文圖片"
    />
  </div>
</template>
