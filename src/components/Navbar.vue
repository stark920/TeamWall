<script setup>
import { RouterLink } from "vue-router";
import AvatarVue from "./Avatar.vue";
</script>

<template>
  <div class="border-b-2 border-black bg-white">
    <div class="container mx-auto w-11/12 md:w-9/12 xl:w-7/12 px-3 sm:px-0">
      <div class="h-16 flex justify-between items-center">
        <h1 class="text-3xl text-black font-paytone">
          <RouterLink to="/"> MetaWall </RouterLink>
        </h1>
        <div class="flex items-center">
          <AvatarVue size="30" imgUrl="avatars/user.png" />
          <h2
            class="text-black font-bold font-azeret border-b-2 border-black ml-2.5"
          >
            Member
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
