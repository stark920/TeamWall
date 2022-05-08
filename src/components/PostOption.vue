<script setup>
import { RouterLink } from "vue-router";
import IconButtonVue from "../components/IconButton.vue";
import IconBellVue from "./icons/IconBell.vue";
import IconThumbsUpVue from "./icons/IconThumbsUp.vue";
import IconHomeVue from "./icons/IconHome.vue";
import IconPlusVue from "./icons/IconPlus.vue";
import IconChatVue from "./icons/IconChat.vue";
</script>

<template>
  <ul
    class="w-96 h-16 bg-secondary flex justify-evenly items-center border-2 border-black rounded-full"
  >
    <li>
      <IconButtonVue size="50">
        <IconHomeVue class="w-6 h-6" />
      </IconButtonVue>
    </li>
    <li>
      <IconButtonVue size="50">
        <IconBellVue class="w-6 h-6" />
      </IconButtonVue>
    </li>
    <li>
      <IconButtonVue size="50">
        <IconThumbsUpVue class="w-6 h-6" />
      </IconButtonVue>
    </li>
    <li>
      <IconButtonVue size="50">
        <IconPlusVue class="w-6 h-6" />
      </IconButtonVue>
    </li>
    <li>
      <router-link to="/chatroomlist">
        <IconButtonVue size="50">
          <IconChatVue class="w-6 h-6" />
        </IconButtonVue>
      </router-link>
    </li>
  </ul>
</template>
