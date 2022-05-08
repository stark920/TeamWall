<script setup>
import { RouterLink } from 'vue-router';
import AvatarVue from '../components/Avatar.vue';
import IconButtonVue from '../components/IconButton.vue';
import IconBellVue from '../components/icons/IconBell.vue';
import IconThumbsUpVue from '../components/icons/IconThumbsUp.vue';
import IconChatVue from '../components/icons/IconChat.vue';
defineProps({
  imgUrl: {
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
</script>

<template>
  <div class="flex flex-col border-2 border-black bg-white px-6 py-8">
    <RouterLink
      to="/post-news"
      class="mb-6 flex items-center justify-center rounded-lg border-2 border-black bg-primary py-2 text-lg text-white hover:bg-warning hover:text-black"
    >
      張貼動態
    </RouterLink>

    <ul class="ml-2 flex flex-col">
      <li>
        <RouterLink to="#" class="mb-5 flex items-center">
          <AvatarVue size="50" :imgUrl="imgUrl" class="cursor-pointer" />
          <h3 class="ml-4 font-bold">{{ name }}</h3>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="#" class="mb-5 flex items-center">
          <IconButtonVue size="50">
            <IconBellVue class="h-6 w-6" />
          </IconButtonVue>
          <h3 class="ml-4 font-bold">追蹤名單</h3>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="#" class="mb-5 flex items-center">
          <IconButtonVue size="50">
            <IconThumbsUpVue class="h-6 w-6" />
          </IconButtonVue>
          <h3 class="ml-4 font-bold">我按讚的文章</h3>
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/chatroomlist" class="flex items-center">
          <IconButtonVue size="50">
            <IconChatVue class="h-6 w-6" />
          </IconButtonVue>
          <h3 class="ml-4 font-bold">聊天室</h3>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
