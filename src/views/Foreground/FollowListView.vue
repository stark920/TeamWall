<script setup>
import { ref } from 'vue';
import CardTitle from '@/components/CardTitle.vue';

const list = ref([
  {
    name: '波吉',
    img: '',
    tracks: 90,
    key: 'personalDynamics',
    createdAt: '2022/2/14 12:00',
  },
]);
</script>

<template>
  <CardTitle title="追蹤名單"></CardTitle>
  <ul>
    <li
      v-for="(item, idx) in list"
      :key="idx"
      class="mb-4 flex items-end justify-between rounded-lg border-2 border-black bg-white p-4 shadow-post"
    >
      <div class="flex items-center">
        <div class="h-10 w-10 rounded-full bg-secondary">
          <img v-if="item.img" :src="item.img" :alt="item.name" />
        </div>
        <div class="ml-4 cursor-pointer" @click="$emit('change-key', item.key)">
          <p class="hover:text-blue_x font-extrabold hover:underline">
            {{ item.name }}
          </p>
          <p class="text-gray_m text-sm">追蹤時間：{{ item.createdAt }}</p>
        </div>
      </div>
      <div class="text-sm">您已追蹤 {{ item.tracks }} 天！</div>
    </li>
  </ul>
</template>
