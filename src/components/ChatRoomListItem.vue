<script setup>
import { toRefs } from 'vue';
import { useToast } from 'vue-toastification';
import dayjs from 'dayjs';
import eventBus from '../utils/eventBus';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useRoomStore } from '@/stores';
const roomStore = useRoomStore();
const toast = useToast();
const { room } = storeToRefs(roomStore);
const router = useRouter();
const props = defineProps({
  room: {
    type: Object,
    required: true,
    default: () => {},
  },
});
const { name, message: msg, avatar, roomId, _id } = toRefs(props.room);
const formateTime = (time) => {
  return dayjs(time).format('YYYY/MM/DD ');
};
const isMobile = () => {
  return document.body.clientWidth < 768;
};
const goChatRoom = () => {
  console.log('channelId', roomId.value);
  if (room.value.roomId && room.value.roomId !== roomId.value) {
    toast.error('您一次只能跟一個人聊天');
    return;
  }
  roomStore.updateRoom({ roomId, name, avatar, receiver: _id });
  if (isMobile()) {
    router.push('/chatroom');
    return;
  }
  eventBus.emit('handleRoom', true);
};
</script>

<template>
  <li
    @click="goChatRoom"
    class="box-rounded mb-4 flex h-[77px] cursor-pointer items-baseline justify-between p-4"
  >
    <div class="flex">
      <img class="avatar h-10 w-10" :src="avatar" alt="avatar" />
      <div class="flex-1 pl-2">
        <p class="font-bold">{{ name }}</p>
        <p
          class="h-10 w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-slate-700 md:w-80"
        >
          {{ msg?.[0]?.message }}
        </p>
      </div>
    </div>
    <span class="text-gray text-xs">{{
      formateTime(msg?.[0]?.createdAt)
    }}</span>
  </li>
</template>
