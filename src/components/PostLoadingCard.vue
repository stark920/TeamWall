<script setup>
import UserInfo from './UserInfo.vue';
import IconThumbsUpVue from '@/components/icons/IconThumbsUp.vue';
import AvatarVue from './Avatar.vue';
</script>

<template>
  <div
    class="animate-pulse rounded-lg border-2 border-black bg-white p-6 shadow-post"
  >
    <UserInfo class="mb-4" subTitle="loading..." />
    <p class="mb-4 h-10 whitespace-pre">Loading...</p>

    <div>
      <button type="button" class="flex items-center justify-center py-5">
        <IconThumbsUpVue class="mr-2 h-5 w-5" />
      </button>
    </div>

    <div class="mb-5 flex items-center">
      <AvatarVue class="mx-2" size="40" />
      <div class="flex w-full">
        <input class="w-full border-2 border-black" type="text" />
        <button
          class="inline-block w-full max-w-[128px] border-2 border-black bg-primary text-base text-white"
        >
          留言
        </button>
      </div>
    </div>
    <div class="mb-4 rounded-lg bg-secondary px-4 py-5">
      <UserInfo class="mb-4" userPageUrl="#" />
      <p class="mb-4 whitespace-pre"></p>
    </div>
  </div>
</template>
