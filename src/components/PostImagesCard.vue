<template>
  <div class="overflow-hidden rounded-lg border-2 border-black">
    <!-- 1 張圖 -->
    <img
      v-if="newImages.length == 1"
      class="max-h-96 cursor-pointer object-center"
      :src="newImages[0]"
      @click="showImg(0)"
    />

    <!-- 2 張圖 -->
    <div v-if="newImages.length == 2" class="grid grid-cols-1 gap-0">
      <template v-for="(item, index) in newImages" :key="item.id">
        <div @click="showImg(index)" class="cursor-pointer">
          <img class="max-h-48 object-center" :src="item" />
        </div>
      </template>
    </div>

    <!-- 3 張圖 -->
    <div v-if="newImages.length == 3" class="grid grid-cols-2 gap-0">
      <template v-for="(item, index) in newImages" :key="item.id">
        <div
          @click="showImg(index)"
          class="cursor-pointer"
          :class="{ 'col-span-2': index == 0 }"
        >
          <img class="max-h-48 object-center" :src="item" />
        </div>
      </template>
    </div>

    <!-- 4 張圖 -->
    <div v-if="newImages.length == 4" class="grid grid-cols-3 gap-0">
      <template v-for="(item, index) in newImages" :key="item.id">
        <div
          @click="showImg(index)"
          class="cursor-pointer"
          :class="{ 'col-span-3': index == 0 }"
        >
          <img class="max-h-48 object-center" :src="item" />
        </div>
      </template>
    </div>

    <!-- 5 張圖以上 -->
    <div
      v-if="newImages.length >= 5"
      class="grid max-h-96 grid-flow-col grid-rows-6 gap-0"
    >
      <template v-for="(item, index) in newImages" :key="item.id">
        <div
          v-if="index < 5"
          @click="showImg(index)"
          class="cursor-pointer"
          :class="{
            'row-span-3': index < 2,
            'row-span-2': index >= 2,
            relative: newImages.length > 5 && index == 4,
          }"
        >
          <img class="object-center" :src="item" />
          <!-- 剩餘圖片提示 -->
          <div
            v-if="newImages.length > 5 && index == 4"
            class="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
          >
            <span class="text-3xl text-white">{{
              `+ ${newImages.length - 5}`
            }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
  <vue-easy-lightbox
    :visible="visible"
    :imgs="newImages"
    :index="index"
    @hide="handleHide"
  ></vue-easy-lightbox>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  images: {
    type: Array,
    default() {
      return [];
    },
  },
});

const visible = ref(false);
const index = ref(0);
const newImages = ref(props.images.map((item) => item.url));
watch(props.images, (curr) => {
  // 若 images 改變, 重新取得
  newImages.value = curr.map((item) => item.url);
});

const showImg = (i) => {
  index.value = i;
  visible.value = true;
};

const handleHide = () => {
  visible.value = false;
};
</script>
