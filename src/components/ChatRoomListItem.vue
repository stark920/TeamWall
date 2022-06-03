<script setup>
import { toRefs } from 'vue';
import dayjs from 'dayjs';
import AvatarVue from './Avatar.vue';
import useChat from '@/use/useChat';
const { handleRoom } = useChat();
const props = defineProps({
  room: {
    type: Object,
    required: true,
    default: () => {},
  },
});
const { name, message: msg, avatar } = toRefs(props.room);
console.log('avatar', avatar.value.url);
const formateTime = (time) => {
  return dayjs(time).format('MM/DD HH:MM');
};
const goChatRoom = () => {
  handleRoom(props.room);
};
</script>

<template>
  <li
    @click="goChatRoom"
    class="shadow-normal mb-4 flex h-[77px] cursor-pointer items-baseline justify-between rounded-lg border-2 border-black bg-white p-4"
  >
    <div class="flex">
      <AvatarVue size="40" :imgUrl="avatar?.url" />
      <div class="flex-1 pl-2">
        <p class="font-bold">{{ name }}</p>
        <p
          class="h-10 w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-slate-500 md:w-80"
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
