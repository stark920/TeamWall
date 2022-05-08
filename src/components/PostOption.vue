<script setup>
import { RouterLink } from 'vue-router';
import IconButtonVue from '../components/IconButton.vue';
import IconBellVue from './icons/IconBell.vue';
import IconThumbsUpVue from './icons/IconThumbsUp.vue';
import IconHomeVue from './icons/IconHome.vue';
import IconPlusVue from './icons/IconPlus.vue';
import IconChatVue from './icons/IconChat.vue';
</script>

<template>
  <ul
    class="flex h-16 w-96 items-center justify-evenly rounded-full border-2 border-black bg-secondary"
  >
    <li>
      <IconButtonVue size="50">
        <IconHomeVue class="h-6 w-6" />
      </IconButtonVue>
    </li>
    <li>
      <IconButtonVue size="50">
        <IconBellVue class="h-6 w-6" />
      </IconButtonVue>
    </li>
    <li>
      <IconButtonVue size="50">
        <IconThumbsUpVue class="h-6 w-6" />
      </IconButtonVue>
    </li>
    <li>
      <IconButtonVue size="50">
        <IconPlusVue class="h-6 w-6" />
      </IconButtonVue>
    </li>
    <li>
      <router-link to="/chatroomlist">
        <IconButtonVue size="50">
          <IconChatVue class="h-6 w-6" />
        </IconButtonVue>
      </router-link>
    </li>
  </ul>
</template>
