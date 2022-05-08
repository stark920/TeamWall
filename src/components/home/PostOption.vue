<script setup>
import { RouterLink } from 'vue-router';
import ButtonIcon from '../ButtonIcon.vue';
import IconBell from '../icons/IconBell.vue';
import IconThumbsUp from '../icons/IconThumbsUp.vue';
import IconHome from '../icons/IconHome.vue';
import IconPlus from '../icons/IconPlus.vue';
</script>

<template>
  <ul
    class="flex h-16 w-80 items-center justify-evenly rounded-full border-2 border-black bg-secondary"
  >
    <li>
      <RouterLink to="/">
        <ButtonIcon size="50">
          <IconHome class="h-6 w-6" />
        </ButtonIcon>
      </RouterLink>
    </li>
    <li>
      <RouterLink to="/">
        <ButtonIcon size="50"> <IconBell class="h-6 w-6" /> </ButtonIcon
      ></RouterLink>
    </li>
    <li>
      <RouterLink to="/">
        <ButtonIcon size="50"> <IconThumbsUp class="h-6 w-6" /> </ButtonIcon
      ></RouterLink>
    </li>
    <li>
      <RouterLink to="/">
        <ButtonIcon size="50">
          <IconPlus class="h-6 w-6" />
        </ButtonIcon>
      </RouterLink>
    </li>
  </ul>
</template>
