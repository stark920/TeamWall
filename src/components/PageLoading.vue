<script setup>
import IconLoading from './icons/IconLoading.vue';
</script>
<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-primary text-white"
  >
    <div class="grid">
      <h1 class="block w-full font-paytone text-5xl tracking-wider">
        MetaWall
      </h1>
      <IconLoading class="mx-auto mt-4 h-8 w-8 animate-spin"></IconLoading>
    </div>
  </div>
</template>
