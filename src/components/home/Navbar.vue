<script setup>
import { RouterLink, useRouter } from 'vue-router';
import Avatar from '../Avatar.vue';
import { apiUser } from '@/utils/apiUser';
const router = useRouter();
defineProps({
  avatar: {
    type: String,
  },
  name: {
    type: String,
    default: 'Unknown',
  },
  userPageUrl: {
    type: String,
    default: '#',
  },
});

const signOut = () => {
  localStorage.removeItem('metaWall');
  router.push({ name: 'sign-in' });
};
</script>

<template>
  <div class="border-b-2 border-black bg-white">
    <div class="container mx-auto w-11/12 px-3 sm:px-0 md:w-9/12 xl:w-7/12">
      <div class="flex h-16 items-center justify-between">
        <h1 class="font-paytone text-3xl text-black hover:animate-pulse">
          <RouterLink to="/"> MetaWall </RouterLink>
        </h1>
        <div class="relative h-full">
          <div
            class="reference flex h-full cursor-pointer items-center"
            @click="showMenu = !showMenu"
            tabindex="0"
          >
            <Avatar size="30" :imgUrl="avatar" />
            <h2
              class="ml-2.5 border-b-2 border-black font-azeret font-bold text-black hover:text-primary"
            >
              {{ name }}
            </h2>
            <div
              class="user-menu absolute right-0 top-[calc(100%-4px)] z-50 grid w-[180px] border-2 border-black text-center"
            >
              <router-link
                :to="userPageUrl"
                class="bg-white py-2 hover:bg-secondary"
                >我的貼文牆</router-link
              >
              <router-link
                to="/profile/settings"
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
  </div>
</template>

<style scoped>
.user-menu {
  visibility: hidden;
  transition: all linear 0.3s;
}
.reference:hover > .user-menu,
.reference:focus > .user-menu,
.reference:focus-within > .user-menu {
  visibility: visible;
}
</style>
