<script setup>
import { RouterLink } from "vue-router";
import IconButtonVue from "../components/IconButton.vue";
import IconBellVue from "./icons/IconBell.vue";
import IconThumbsUpVue from "./icons/IconThumbsUp.vue";
</script>

<template>
  <div class="flex justify-center">
    <ul
      class="w-80 h-16 bg-secondary flex justify-evenly items-center border-2 border-black rounded-full"
    >
      <li>
        <IconButtonVue size="50">
          <IconBellVue class="w-6 h-6" />
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
          <IconBellVue class="w-6 h-6" />
        </IconButtonVue>
      </li>
    </ul>
  </div>
</template>
