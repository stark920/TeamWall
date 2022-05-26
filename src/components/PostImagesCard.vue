<template>
  <div class="overflow-hidden rounded-lg border-2 border-black">
    <!-- 1 張圖 -->
    <img
      v-if="images.length == 1"
      class="max-h-96 object-center"
      :src="images[0]?.url"
    />

    <!-- 2 張圖 -->
    <div v-if="images.length == 2" class="grid grid-cols-1 gap-0">
      <template v-for="item in images" :key="item.id">
        <div>
          <img class="max-h-48 object-center" :src="item.url" />
        </div>
      </template>
    </div>

    <!-- 3 張圖 -->
    <div v-if="images.length == 3" class="grid grid-cols-2 gap-0">
      <template v-for="(item, index) in images" :key="item.id">
        <div :class="{ 'col-span-2': index == 0 }">
          <img class="max-h-48 object-center" :src="item.url" />
        </div>
      </template>
    </div>

    <!-- 4 張圖 -->
    <div v-if="images.length == 4" class="grid grid-cols-3 gap-0">
      <template v-for="(item, index) in images" :key="item.id">
        <div :class="{ 'col-span-3': index == 0 }">
          <img class="max-h-48 object-center" :src="item.url" />
        </div>
      </template>
    </div>

    <!-- 5 張圖以上 -->
    <div
      v-if="images.length >= 5"
      class="grid max-h-96 grid-flow-col grid-rows-6 gap-0"
    >
      <template v-for="(item, index) in images" :key="item.id">
        <div
          v-if="index < 5"
          :class="{
            'row-span-3': index < 2,
            'row-span-2': index >= 2,
            relative: images.length > 5 && index == 4,
          }"
        >
          <img class="object-center" :src="item.url" />
          <!-- 剩餘圖片提示 -->
          <div
            v-if="images.length > 5 && index == 4"
            class="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
          >
            <span class="text-3xl text-white">{{
              `+ ${images.length - 5}`
            }}</span>
          </div>
        </div>
      </template>
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
