<template>
  <div class="grid md:grid-cols-3 gap-x-3 gap-y-1.5 mb-4">
    <div>
      <select class="w-full h-11 border-2 border-black" name="category">
        <option value="newest" selected>最新貼文</option>
        <option value="popular">熱門貼文</option>
      </select>
    </div>
    <div class="md:col-span-2">
      <div class="flex h-11 border-2 border-black">
        <input
          class="w-full border-0"
          type="text"
          placeholder="搜尋貼文"
          v-model.trim="searchKey"
        />
        <button
          type="button"
          class="bg-primary w-11 flex justify-center items-center border-l-2 border-black"
        >
          <IconSearchVue class="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconSearchVue from "../components/icons/IconSearch.vue";
import { ref } from "vue";

const searchKey = ref("");
</script>
