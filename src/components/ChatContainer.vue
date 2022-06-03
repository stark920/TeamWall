<script setup>
import { onBeforeUnmount } from 'vue';
import ChatRoom from './ChatRoom.vue';
import { storeToRefs } from 'pinia';
import { useRoomStore } from '@/stores';
const roomStore = useRoomStore();
const { room } = storeToRefs(roomStore);
onBeforeUnmount(() => {
  roomStore.updateRoom([]);
});
</script>

<template>
  <div class="fixed bottom-0 right-10 flex w-4/5 justify-end">
    <template v-for="item in room" :key="item.roomId">
      <chat-room :roomInfo="item" />
    </template>
  </div>
</template>
