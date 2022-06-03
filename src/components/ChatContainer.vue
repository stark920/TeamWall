<script setup>
import ChatRoom from './ChatRoom.vue';
import { storeToRefs } from 'pinia';
import { useRoomStore } from '@/stores';
const roomStore = useRoomStore();
const { room } = storeToRefs(roomStore);
</script>

<template>
  <div
    class="pointer-events-none fixed bottom-0 right-10 hidden w-4/5 justify-end lg:flex"
  >
    <template v-for="item in room" :key="item.roomId">
      <chat-room :roomInfo="item" />
    </template>
  </div>
</template>
