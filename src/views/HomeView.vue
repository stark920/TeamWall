<script setup>
import Navbar from '../components/home/Navbar.vue';
import PostOption from '../components/home/PostOption.vue';
import SideMenu from '../components/home/SideMenu.vue';
import ChatContainer from '../components/ChatContainer.vue';
import { RouterView, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { apiUser, token } from '../utils/apiUser';
import { useUserStore } from '@/stores';
const userStore = useUserStore();
const router = useRouter();

const isLoading = ref(true);

onMounted(() => {
  if (userStore?.name) {
    isLoading.value = !isLoading.value;
    return;
  }
  if (!token()) {
    return router.replace('/sign-in');
  }
  apiUser
    .check()
    .then((res) => {
      userStore.updateUser(res.data.data);
      isLoading.value = !isLoading.value;
    })
    .catch(() => {
      return router.replace('/sign-in');
    });
});
</script>
<template>
  <div class="min-h-screen w-full">
    <Navbar
      :name="userStore.user.name"
      :avatar="userStore.user.avatar"
      :userPageUrl="'/profile/' + userStore.user.id"
      class="mb-12"
    />
    <div class="container mx-auto w-11/12 px-3 sm:px-0 md:w-9/12 xl:w-7/12">
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <RouterView></RouterView>
        </div>
        <div class="hidden lg:block">
          <SideMenu
            :name="userStore.user.name"
            :avatar="userStore.user.avatar"
            :userPageUrl="'/profile/' + userStore.user.id"
          />
        </div>
      </div>
    </div>
    <ChatContainer />
    <PostOption class="fixed left-1/2 bottom-4 -translate-x-1/2 lg:hidden" />
  </div>
</template>
