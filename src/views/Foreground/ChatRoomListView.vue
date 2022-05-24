<script setup>
import { reactive, onMounted } from 'vue';
import CardTitleVue from '@/components/CardTitle.vue';
import ChatRoomListItem from '@/components/ChatRoomListItem.vue';
import { apiChat } from '@/utils/apiChat';
const chatList = reactive([]);
const queryRoomList = async () => {
  try {
    const res = await apiChat.record();
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
</script>

<template>
  <section>
    <CardTitleVue title="聊天室" />
    <ul>
      <template v-for="room in chatList" :key="room.channelId">
        <chat-room-list-item :room="room" />
      </template>
    </ul>
  </section>
</template>

<style></style>
