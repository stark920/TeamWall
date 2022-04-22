<script setup>
import { RouterLink } from "vue-router";
import AvatarVue from "../components/Avatar.vue";
import IconButtonVue from "../components/IconButton.vue";
import IconBellVue from "../components/icons/IconBell.vue";
import IconThumbsUpVue from "../components/icons/IconThumbsUp.vue";

defineProps({
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
});
</script>

<template>
  <div class="flex flex-col px-6 py-8 border-2 border-black">
    <button
      type="button"
      class="h-12 bg-primary text-white border-2 border-black rounded-lg mb-6"
    >
      張貼動態
    </button>
    <ul class="flex flex-col ml-2">
      <li>
        <RouterLink :to="userPageUrl" class="flex items-center mb-5">
          <AvatarVue size="50" :imgUrl="imgUrl" class="cursor-pointer" />
          <h3 class="font-bold ml-4">{{ name }}</h3>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/tracks" class="flex items-center mb-5">
          <IconButtonVue size="50">
            <IconBellVue class="w-6 h-6" />
          </IconButtonVue>
          <h3 class="font-bold ml-4">追蹤名單</h3>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/likes" class="flex items-center">
          <IconButtonVue size="50">
            <IconThumbsUpVue class="w-6 h-6" />
          </IconButtonVue>
          <h3 class="font-bold ml-4">我按讚的文章</h3>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
