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
  <div class="border-2 border-black rounded-lg p-6">
    <UserInfoVue
      class="mb-4"
      :imgUrl="post.avatar"
      :name="post.userName"
      userPageUrl="#"
      :subTitle="post.createAt"
    />
    <p class="whitespace-pre mb-4">{{ post.content }}</p>
    <img
      class="border-2 border-black rounded-lg w-full max-h-96 object-cover object-center"
      v-if="post.updateImage"
      :src="post.updateImage"
      alt="貼文圖片"
    />
  </div>
</template>
