<script setup>
import { RouterView } from 'vue-router';
import Navbar from '../components/home/Navbar.vue';
import PostOption from '../components/home/PostOption.vue';
import SideMenu from '../components/home/SideMenu.vue';
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
            name="邊緣小杰"
            imgUrl="avatars/user.png"
            userPageUrl="/user"
          />
        </div>
      </div>
    </div>
    <PostOption class="fixed left-1/2 bottom-12 -translate-x-1/2 md:hidden" />
  </div>
</template>
