<script setup>
import UserInfoVue from "./UserInfo.vue";

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
  <div class="border-2 border-black rounded-lg mb-4 p-6">
    <UserInfoVue
      class="mb-4"
      :imgUrl="post.avatar"
      :name="post.userName"
      userPageUrl="#"
      :subTitle="post.createAt"
    />
    <p class="whitespace-pre mb-4">{{ post.content }}</p>
    <img
      class="w-full"
      v-if="post.updateImage"
      :src="post.updateImage"
      alt="貼文圖片"
    />
  </div>
</template>
