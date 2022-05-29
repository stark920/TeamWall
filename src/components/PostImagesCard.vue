<template>
  <div class="overflow-hidden rounded-lg border-2 border-black">
    <div
      class="grid gap-0"
      :class="{
        'grid-cols-1': newImages.length <= 2,
        'grid-cols-2': newImages.length == 3,
        'grid-cols-3': newImages.length == 4,
        'max-h-96 grid-flow-col grid-rows-6': newImages.length >= 5,
      }"
    >
      <template v-for="(item, index) in newImages" :key="item.id">
        <div
          v-if="index < 5"
          @click="showImg(index)"
          class="cursor-pointer"
          :class="{
            'col-span-2': newImages.length == 3 && index == 0,
            'col-span-3': newImages.length == 4 && index == 0,
            'row-span-3': newImages.length >= 5 && index < 2,
            'row-span-2': newImages.length >= 5 && index >= 2,
            relative: newImages.length > 5 && index == 4,
          }"
        >
          <img
            :src="item"
            class="object-center"
            :class="{
              'max-h-96': newImages.length == 1,
              'max-h-48':
                newImages.length == 2 ||
                newImages.length == 3 ||
                newImages.length == 4,
            }"
          />
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
    default: () => [],
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
