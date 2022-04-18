<script setup>
defineProps({
  size: {
    type: String,
    default: "40",
  },
});
</script>

<template>
  <div
    class="overflow-hidden rounded-full border-2 border-black bg-light-blue flex justify-center items-center text-black cursor-pointer hover:text-white hover:bg-primary"
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
