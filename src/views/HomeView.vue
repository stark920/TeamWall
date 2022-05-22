<script setup>
import { ref, inject } from 'vue';
import { RouterView } from 'vue-router';
import Navbar from '../components/home/Navbar.vue';
import PostOption from '../components/home/PostOption.vue';
import SideMenu from '../components/home/SideMenu.vue';
import ChatContainer from '../components/ChatContainer.vue';
import { useUserStore } from '@/stores';
import { API_URL } from '../global/constant';
const userStore = useUserStore();

const axios = inject('axios');

const checkLogin = () => {
  // get localStorage JWT token
  const token = localStorage.getItem('metaWall');
  if (!token) {
    console.log('尚未登入');
    // router.push('/signin')
    return;
  }

  // set axios token
  axios.defaults.headers.common.Authorization = token;

  axios
    .get(`${API_URL}/users/check`)
    .then((res) => {
      userStore.updateUser(res.data.data);
    })
    .catch(() => {
      console.log('尚未登入');
      // router.push('/signin')
    });
};

checkLogin();
</script>

<template>
  <div class="min-h-screen w-screen">
    <Navbar class="mb-12" />
    <div class="container mx-auto w-11/12 px-3 sm:px-0 md:w-9/12 xl:w-7/12">
      <div class="grid gap-6 md:grid-cols-3">
        <div class="md:col-span-2">
          <RouterView></RouterView>
        </div>
        <div class="hidden md:block">
          <SideMenu
            :name="userStore.user?.name"
            :imgUrl="userStore.user?.avatar"
            userPageUrl="/user/6289cb654896923f8331bc15"
          />
        </div>
      </div>
    </div>
    <ChatContainer />
    <PostOption class="fixed left-1/2 bottom-12 -translate-x-1/2 md:hidden" />
  </div>
</template>
