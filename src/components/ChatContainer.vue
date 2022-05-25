<script setup>
import { onBeforeUnmount, ref } from 'vue';
import ChatRoom from './ChatRoom.vue';
import eventBus from '../utils/eventBus';
const showRoom = ref(false);
const handleRoom = (isOpen) => {
  showRoom.value = isOpen;
};
eventBus.on('handleRoom', handleRoom);
onBeforeUnmount(() => {
  eventBus.off('handleRoom', handleRoom);
});
</script>

<template>
  <chat-room v-if="showRoom" />
</template>
