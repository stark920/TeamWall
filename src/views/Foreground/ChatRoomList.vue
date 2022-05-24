<script setup>
import { reactive, onMounted, onBeforeUnmount, inject } from 'vue';
import { API_URL } from '@/global/constant';
import CardTitleVue from '../../components/CardTitle.vue';
import ChatRoomListItem from '../../components/ChatRoomListItem.vue';
import eventBus from '../utils/eventBus';
const axios = inject('axios');
const chatList = reactive([]);

eventBus.on('updateChatRecord', ({ roomId, msg }) => {
  const targetIndex = chatList.findIndex((item) => item.roomId === roomId);
  targetIndex > -1 && (chatList[targetIndex].message = [msg]);
});
const queryRoomList = async () => {
  try {
    const res = await axios.post(`${API_URL}/chat/chat-record`);
    const { status, chatRecord } = res;
    if (status === 'success') {
      Object.assign(chatList, chatRecord);
      console.log('chatList', chatList);
    }
  } catch (error) {
    console.log('error', error);
  }
};

onMounted(() => {
  queryRoomList();
});

onBeforeUnmount(() => {
  eventBus.all.clear();
});
</script>

<template>
  <section>
    <CardTitleVue title="聊天室" />
    <ul>
      <template v-for="room in chatList" :key="room._id">
        <chat-room-list-item :room="room" />
      </template>
    </ul>
  </section>
</template>

<style></style>
