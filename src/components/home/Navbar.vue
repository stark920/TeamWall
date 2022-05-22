<script setup>
import { RouterLink } from 'vue-router';
import Avatar from '../Avatar.vue';

import { useUserStore } from '@/stores';
const userStore = useUserStore();
</script>

<template>
  <div class="border-b-2 border-black bg-white">
    <div class="container mx-auto w-11/12 px-3 sm:px-0 md:w-9/12 xl:w-7/12">
      <div class="flex h-16 items-center justify-between">
        <h1 class="font-paytone text-3xl text-black">
          <RouterLink to="/"> MetaWall </RouterLink>
        </h1>
        <div class="flex items-center">
          <Avatar size="30" :imgUrl="userStore.user?.avatar" />
          <h2
            class="ml-2.5 border-b-2 border-black font-azeret font-bold text-black"
          >
            Member
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
