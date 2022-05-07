<script setup>
import { reactive } from "vue";
import ChatRoomListItem from "@/components/ChatRoomListItem.vue";
const chatList = reactive([
  {
    roomId: 124234234,
    receiver: {
      _id: "2266",
      userName: "Dora",
      avatar: "https://i.pravatar.cc/150?img=19",
    },
    // 以下使用關聯
    channelId: 1,
    message: {
      _id: 9,
      user: {
        userName: "joe",
        _id: "5566",
      },
      content: "等待時間直接變成一個半小時",
      createdAt: "2022-05-05T12:33:19.793Z",
    },
  },
  {
    roomId: 124234238,
    receiver: {
      _id: "8866",
      userName: "May",
      avatar: "https://i.pravatar.cc/150?img=27",
    },
    // 以下使用關聯
    channelId: 2,
    message: {
      _id: 10,
      user: {
        userName: "joe",
        _id: "5566",
      },
      content:
        "我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽我不想聽",
      createdAt: "2022-05-05T12:33:19.793Z",
    },
  },
]);
</script>

<template>
  <section>
    <h1 class="title">聊天室</h1>
    <ul class="pt-4">
      <template v-for="room in chatList" :key="room.channelId">
        <chat-room-list-item :room="room" />
      </template>
    </ul>
  </section>
</template>

<style></style>
