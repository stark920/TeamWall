<template>
  <div class="min-h-screen">
    <NavbarVue class="mb-12" />
    <div class="container mx-auto w-11/12 md:w-9/12 xl:w-7/12">
      <div class="flex justify-between items-start">
        <div class="w-full md:w-7/12">
          <div class="w-full relative z-10">
            <div
              class="flex justify-center items-center font-azeret bg-white text-xl p-5 mb-8 border-2 border-black relative shadow-block z-10 font-extrabold"
            >
              追蹤名單
            </div>
            <ul>
              <li v-for="(item, idx) in list" :key="idx" class="bg-white border-2 border-black rounded-lg shadow-post mb-4 p-4 flex justify-between items-end">
                <div class="flex items-center">
                  <div class="w-10 h-10 bg-secondary rounded-full">
                    <img v-if="item.img" :src="item.img" :alt="item.name">
                  </div>
                  <div class="ml-4 cursor-pointer" @click="$emit('change-key', item.key)">
                    <p class="font-extrabold hover:text-blue_x hover:underline">{{ item.name }}</p>
                    <p class="text-gray_m text-sm">追蹤時間：{{ item.createdAt }}</p>
                  </div>
                </div>
                <div class="text-sm">您已追蹤 {{ item.tracks }} 天！</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-38 hidden md:block">
          <SideMenu
            name="邊緣小杰"
            imgUrl="avatars/user.png"
            userPageUrl="/user"
          />
        </div>
        <PostOption class="fixed left-1/2 -translate-x-1/2 bottom-12 md:hidden" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toRefs, inject, reactive } from "vue";
import NavbarVue from "../components/Navbar.vue";
import PostOption from "../components/PostOption.vue";
import SideMenu from "../components/SideMenu.vue";

const list = ref([
  {
    name: '波吉',
    img: '',
    tracks: 90,
    key: 'personalDynamics',
    createdAt: '2022/2/14 12:00'
  }
]);
</script>

<style>
.w-38{
  width: 38%;
}
</style>
