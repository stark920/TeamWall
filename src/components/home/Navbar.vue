<script setup>
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import Avatar from '../Avatar.vue';
import { apiUser } from '@/utils/apiUser';
const router = useRouter();

const signOut = () => {
  apiUser
    .signOut()
    .then(() => {
      localStorage.removeItem('metaWall');
      router.push({ name: 'sign-in' });
    })
    .catch(() => {
      localStorage.removeItem('metaWall');
      router.push({ name: 'sign-in' });
    });
};

defineProps({
  avatar: {
    type: String,
  },
  name: {
    type: String,
    default: 'Unknown',
  },
});

const showMenu = ref(false);
</script>

<template>
  <div class="border-b-2 border-black bg-white">
    <div class="container mx-auto w-11/12 px-3 sm:px-0 md:w-9/12 xl:w-7/12">
      <div class="flex h-16 items-center justify-between">
        <h1 class="font-paytone text-3xl text-black">
          <RouterLink to="/"> MetaWall </RouterLink>
        </h1>
        <div class="relative">
          <div
            class="flex cursor-pointer items-center"
            @click="showMenu = !showMenu"
          >
            <Avatar size="30" :imgUrl="avatar" />
            <h2
              class="ml-2.5 border-b-2 border-black font-azeret font-bold text-black"
            >
              {{ name }}
            </h2>
          </div>
          <div
            v-show="showMenu"
            class="absolute right-0 top-[calc(100%+0.5rem)] grid w-[180px] border-2 border-black text-center"
          >
            <router-link to="/profile" class="bg-white py-2 hover:bg-secondary"
              >我的貼文牆</router-link
            >
            <router-link
              to="/home/profile/edit"
              class="border-t-2 border-b-2 border-black bg-white py-2 hover:bg-secondary"
              >修改個人資料</router-link
            >
            <button
              type="button"
              class="bg-white py-2 hover:bg-secondary"
              @click="signOut"
            >
              登出
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
