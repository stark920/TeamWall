<template>
  <!-- 1 張圖 -->
  <div
    v-if="images.length == 1"
    class="overflow-hidden rounded-lg border-2 border-black"
  >
    <img class="max-h-96 object-center" :src="images[0]?.url" />
  </div>
  <!-- 2 張圖 -->
  <div
    v-if="images.length == 2"
    class="overflow-hidden rounded-lg border-2 border-black"
  >
    <div class="grid grid-cols-1 gap-0">
      <div class="" v-for="item in images" :key="item.id">
        <img class="max-h-48 object-center" :src="item.url" />
      </div>
    </div>
  </div>
  <!-- 3 張圖 -->
  <div
    v-if="images.length == 3"
    class="overflow-hidden rounded-lg border-2 border-black"
  >
    <div class="grid grid-cols-2 gap-0">
      <div class="col-span-2">
        <img class="max-h-48 object-center" :src="images[0]?.url" />
      </div>
      <div class="">
        <img class="max-h-48 object-center" :src="images[1]?.url" />
      </div>
      <div class="">
        <img class="max-h-48 object-center" :src="images[2]?.url" />
      </div>
    </div>
  </div>
  <!-- 4 張圖 -->
  <div
    v-if="images.length == 4"
    class="overflow-hidden rounded-lg border-2 border-black"
  >
    <div class="grid grid-cols-3 gap-0">
      <div class="col-span-3">
        <img class="max-h-48 object-center" :src="images[0]?.url" />
      </div>
      <div class="">
        <img class="max-h-48 object-center" :src="images[1]?.url" />
      </div>
      <div class="">
        <img class="max-h-48 object-center" :src="images[2]?.url" />
      </div>
      <div class="">
        <img class="max-h-48 object-center" :src="images[3]?.url" />
      </div>
    </div>
  </div>
  <!-- 5 張圖 -->
  <div
    v-if="images.length == 5"
    class="overflow-hidden rounded-lg border-2 border-black"
  >
    <div class="grid max-h-96 grid-flow-col grid-rows-6 gap-0">
      <div class="row-span-3">
        <img class="object-center" :src="images[0]?.url" />
      </div>
      <div class="row-span-3">
        <img class="object-center" :src="images[1]?.url" />
      </div>
      <div class="row-span-2">
        <img class="object-center" :src="images[2]?.url" />
      </div>
      <div class="row-span-2">
        <img class="object-center" :src="images[3]?.url" />
      </div>
      <div class="row-span-2">
        <img class="object-center" :src="images[4]?.url" />
      </div>
    </div>
  </div>
  <!-- 6 張圖以上 -->
  <div
    v-if="images.length > 5"
    class="overflow-hidden rounded-lg border-2 border-black"
  >
    <div class="grid max-h-96 grid-flow-col grid-rows-6 gap-0">
      <div class="row-span-3">
        <img class="object-center" :src="images[0]?.url" />
      </div>
      <div class="row-span-3">
        <img class="object-center" :src="images[1]?.url" />
      </div>
      <div class="row-span-2">
        <img class="object-center" :src="images[2]?.url" />
      </div>
      <div class="row-span-2">
        <img class="object-center" :src="images[3]?.url" />
      </div>
      <div class="relative row-span-2">
        <img class="object-center" :src="images[4]?.url" />
        <div
          class="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
        >
          <span class="text-3xl text-white">{{
            `+ ${images.length - 5}`
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  images: {
    type: Array,
    default() {
      return [];
    },
  },
});
</script>
