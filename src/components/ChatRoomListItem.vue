<script setup>
import { defineProps, toRefs } from 'vue';
import AvatarVue from './Avatar.vue';
import eventBus from '../utils/eventBus';
import { useRouter } from 'vue-router';
import { formateTime as formateDate } from '../utils/formateTime';
const router = useRouter();
const props = defineProps({
  room: {
    type: Object,
    required: true,
    default: () => {},
  },
});
const { receiver, channelId, message } = toRefs(props.room);
const formateTime = (time) => {
  return formateDate(time, 'YYYY/MM/DD');
};
const isMobile = () => {
  return document.body.clientWidth < 768;
};
const goChatRoom = () => {
  console.log('channelId', channelId.value);
  if (isMobile()) {
    router.push('/chat-room');
    return;
  }
  eventBus.emit('handleRoom', true);
};
</script>

<template>
  <li
    @click="goChatRoom"
    class="mb-4 flex h-[77px] cursor-pointer items-baseline justify-between rounded-lg border-2 border-black bg-white p-4 shadow-post"
  >
    <div class="flex">
      <AvatarVue size="40" :imgUrl="receiver.avatar" />
      <div class="flex-1 pl-2">
        <p class="font-bold">{{ receiver.userName }}</p>
        <p
          class="h-10 w-[180px] overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-slate-700 md:w-[400px]"
        >
          {{ message.content }}
        </p>
      </div>
    </div>
    <span class="text-gray text-xs">{{ formateTime(message.createdAt) }}</span>
  </li>
</template>
