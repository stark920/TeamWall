<script setup>
import { reactive, onMounted, onBeforeUnmount, ref } from 'vue';
import { useToast } from 'vue-toastification';
import IconLoading from '@/components/icons/IconLoading.vue';
import CardTitleVue from '../../components/CardTitle.vue';
import ChatRoomListItem from '../../components/ChatRoomListItem.vue';
import eventBus from '@/utils/eventBus';
import { apiChat } from '@/utils/apiChat';
const toast = useToast();
const chatList = reactive([]);
const isLoading = ref(true);
const updateChatRecord = ({ roomId, msg }) => {
  const targetIndex = chatList.findIndex((item) => item.roomId === roomId);
  targetIndex > -1 && (chatList[targetIndex].message = [msg]);
};

eventBus.on('updateChatRecord', updateChatRecord);
const queryRoomList = async () => {
  try {
    isLoading.value = true;
    const res = await apiChat.record();
    const {
      data: { status, chatRecord },
    } = res;
    if (status) {
      Object.assign(chatList, chatRecord);
      console.log('chatList', chatList);
    }
  } catch (error) {
    const msg = error.response.data?.message;
    msg && toast.error(msg);
  } finally {
    isLoading.value = false;
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
      <li class="text-center" v-show="!isLoading && chatList.length === 0">
        無聊天記錄
      </li>
      <li class="flex items-center justify-center pt-8" v-show="isLoading">
        載入中
        <IconLoading class="ml-1 h-4 w-4 animate-spin" />
      </li>
      <template v-for="room in chatList" :key="room?.roomId">
        <chat-room-list-item :room="room" />
      </template>
    </ul>
  </section>
</template>

<style></style>
