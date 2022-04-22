<script setup>
import { RouterLink } from "vue-router";
import AvatarVue from "./Avatar.vue";

defineProps({
  size: {
    type: String,
    default: "40",
  },
  imgUrl: {
    type: String,
  },
  name: {
    type: String,
    default: "Unknown",
  },
  userPageUrl: {
    type: String,
    default: "#",
  },
  subTitle: {
    type: String,
  },
});
</script>

<template>
  <div class="border-b-2 border-black">
    <div class="container mx-auto">
      <div class="h-16 flex justify-between items-center">
        <h1 class="text-3xl text-black font-paytone">MetaWall</h1>
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
