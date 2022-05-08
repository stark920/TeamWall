<script setup>
import { defineProps, toRefs } from "vue";
import AvatarVue from "./Avatar.vue";
import eventBus from "../utils/eventBus";
import { useRouter } from "vue-router";
import { formateTime as formateDate } from "../utils/formateTime";
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
  return formateDate(time, "YYYY/MM/DD");
};
const isMobile = () => {
  return document.body.clientWidth < 768;
};
const goChatRoom = () => {
  console.log("channelId", channelId.value);
  if (isMobile()) {
    router.push("/chatroom");
    return;
  }
  eventBus.emit("handleRoom", true);
};
</script>

<template>
  <li
    @click="goChatRoom"
    class="bg-white border-2 border-black rounded-lg shadow-post flex items-baseline p-4 h-[77px] mb-4 justify-between cursor-pointer"
  >
    <div class="flex">
      <AvatarVue size="40" :imgUrl="receiver.avatar" />
      <div class="flex-1 pl-2">
        <p class="font-bold">{{ receiver.userName }}</p>
        <p
          class="w-[200px] md:w-80 h-10 whitespace-nowrap overflow-hidden overflow-ellipsis text-sm text-slate-700"
        >
          {{ message.content }}
        </p>
      </div>
    </div>
    <span class="text-gray text-xs">{{ formateTime(message.createdAt) }}</span>
  </li>
</template>
