<script setup>
defineProps({
  title: {
    type: String,
  },
});
</script>

<template>
  <div
    class="flex justify-center items-center font-azeret bg-white text-xl p-5 mb-8 border-2 border-black relative shadow-block"
  >
    {{ title }}
  </div>
</template>

<style>
.shadow-block::after {
  content: "";
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
