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
  <div class="flex items-center gap-x-2">
    <AvatarVue :size="size" :imgUrl="imgUrl" />
    <div>
      <RouterLink
        :to="userPageUrl"
        class="font-bold hover:text-primary hover:underline"
      >
        {{ name }}
      </RouterLink>
      <p class="text-sm text-subtitle">
        {{ subTitle }}
      </p>
    </div>
  </div>
</template>
