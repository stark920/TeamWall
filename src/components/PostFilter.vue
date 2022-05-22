<template>
  <div class="mb-4 grid gap-x-3 gap-y-1.5 md:grid-cols-3">
    <div>
      <select
        class="h-11 w-full border-2 border-black"
        name="category"
        v-model.number="sort"
        @change="getPosts"
      >
        <option value="1" selected>最新貼文</option>
        <option value="2">最舊貼文</option>
      </select>
    </div>
    <div class="md:col-span-2">
      <div class="flex h-11 border-2 border-black">
        <input
          class="w-full border-0"
          type="text"
          placeholder="搜尋貼文"
          v-model.trim="searchKey"
          @keyup.enter="getPosts"
        />
        <button
          type="button"
          class="flex w-11 items-center justify-center border-l-2 border-black bg-primary"
          @click="getPosts"
        >
          <IconSearchVue class="h-8 w-8 text-white" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconSearchVue from '../components/icons/IconSearch.vue';
import { ref } from 'vue';

const emit = defineEmits(['get-posts']);
const searchKey = ref('');
const sort = ref(1);

const getPosts = () => {
  emit('get-posts', sort.value, searchKey.value);
};
</script>
