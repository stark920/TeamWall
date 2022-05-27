<template>
  <div
    class="flex animate-pulse justify-between rounded-lg border-2 border-black bg-white py-5 pl-4 pr-10 shadow-post"
  >
    <UserInfo class="mb-4" subTitle="loading..." />
    <ul class="flex gap-10">
      <li>
        <button
          type="button"
          class="flex flex-col items-center justify-center gap-1"
        >
          <IconThumbsUpVue class="h-5 w-5 text-primary" />
          <span>取消</span>
        </button>
      </li>
      <li>
        <button
          type="button"
          class="flex flex-col items-center justify-center gap-1"
        >
          <IconArrowRightVue class="h-5 w-5" />
          <span>查看</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import UserInfo from '@/components/UserInfo.vue';
import IconThumbsUpVue from '@/components/icons/IconThumbsUp.vue';
import IconArrowRightVue from '@/components/icons/IconArrowRight.vue';
</script>
