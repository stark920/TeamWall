<script setup>
defineProps({
  size: {
    type: String,
    default: '40',
  },
});
</script>

<template>
  <div
    class="bg-light-blue flex cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-black text-black hover:bg-primary hover:text-white"
    :style="`width: ${size}px; height: ${size}px;`"
  >
    <slot></slot>
  </div>
</template>

<style>
.bg-light-blue {
  background-color: #e2edfa;
}
</style>
