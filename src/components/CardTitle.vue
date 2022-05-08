<script setup>
defineProps({
  title: {
    type: String,
  },
});
</script>

<template>
  <div
    class="shadow-block relative mb-8 flex items-center justify-center border-2 border-black bg-white p-5 font-azeret text-xl"
  >
    {{ title }}
  </div>
</template>

<style>
.shadow-block::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border: 2px solid #000040;
  top: 2px;
  right: 2px;
  z-index: -1;
  box-sizing: content-box;
}
</style>
