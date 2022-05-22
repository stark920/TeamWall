<script setup>
import { onBeforeUnmount, ref } from 'vue';
import ChatRoom from './ChatRoom.vue';
import eventBus from '../utils/eventBus';
const showRoom = ref(false);
eventBus.on('handleRoom', (isOpen) => {
  showRoom.value = isOpen;
});

onBeforeUnmount(() => {
  eventBus.all.clear();
});
</script>

<template>
  <chat-room v-if="showRoom" />
</template>
