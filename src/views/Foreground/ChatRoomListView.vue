<script setup>
import { reactive, onMounted, onBeforeUnmount } from 'vue';
import CardTitleVue from '../../components/CardTitle.vue';
import ChatRoomListItem from '../../components/ChatRoomListItem.vue';
import eventBus from '@/utils/eventBus';
import { apiChat } from '@/utils/apiChat';
const chatList = reactive([]);

const updateChatRecord = ({ roomId, msg }) => {
  const targetIndex = chatList.findIndex((item) => item.roomId === roomId);
  targetIndex > -1 && (chatList[targetIndex].message = [msg]);
};

eventBus.on('updateChatRecord', updateChatRecord);
const queryRoomList = async () => {
  try {
    const res = await apiChat.record();
    console.log('res', res);
    const {
      data: { status, chatRecord },
    } = res;
    if (status) {
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
  eventBus.off('updateChatRecord', updateChatRecord);
});
</script>

<template>
  <section>
    <CardTitleVue title="聊天室" />
    <ul>
      <template v-for="room in chatList" :key="room?.roomId">
        <chat-room-list-item :room="room" />
      </template>
    </ul>
  </section>
</template>

<style></style>
