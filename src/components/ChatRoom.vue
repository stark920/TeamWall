<script setup>
import { reactive, onMounted, onBeforeUnmount } from "vue";
import ChatRoomMessage from "./ChatRoomMessage.vue";
import ChatRoomInputBox from "./ChatRoomInputBox.vue";
import Close from "../icons/Close.vue";
import IconBack from "../icons/IconBack.vue";
import eventBus from "../utils/eventBus";
import { useRouter } from "vue-router";
const router = useRouter();
const messageList = reactive([
  {
    _id: 1,
    user: {
      userName: "Dora",
      _id: "2266",
    },
    userName: "Dora",
    content: "結果你的晚餐還在被延",
    createdAt: "2022-05-05T12:28:19.793Z",
  },
  {
    _id: 2,
    user: {
      userName: "Dora",
      _id: "2266",
    },
    content: "原來新北市跟台北市一樣",
    createdAt: "2022-05-05T12:28:19.813Z",
  },
  {
    _id: 3,
    user: {
      userName: "joe",
      _id: "5566",
    },
    content: "等到我花都謝了",
    createdAt: "2022-05-05T12:28:19.999Z",
  },
  {
    _id: 4,
    user: {
      userName: "Dora",
      _id: "2266",
    },
    content: "點外送練習修身養性",
    createdAt: "2022-05-05T12:29:19.793Z",
  },
  {
    _id: 5,
    user: {
      userName: "Dora",
      _id: "2266",
    },
    content: "我在晚餐開店的第一分鐘就點餐了",
    createdAt: "2022-05-05T12:30:19.793Z",
  },
  {
    _id: 6,
    user: {
      userName: "joe",
      _id: "5566",
    },
    content: "雨越大等越久",
    createdAt: "2022-05-05T12:30:19.899Z",
  },
  {
    _id: 7,
    user: {
      userName: "Dora",
      _id: "2266",
    },
    content: "你的晚餐竟然被四延了",
    createdAt: "2022-05-05T12:32:19.793Z",
  },
  {
    _id: 8,
    user: {
      userName: "joe",
      _id: "5566",
    },
    content: "傻眼",
    createdAt: "2022-05-05T12:33:19.793Z",
  },
  {
    _id: 9,
    user: {
      userName: "joe",
      _id: "5566",
    },
    content: "等待時間直接變成一個半小時",
    createdAt: "2022-05-05T12:33:19.793Z",
  },
  {
    _id: 1,
    user: {
      userName: "Dora",
      _id: "2266",
    },
    userName: "Dora",
    content: "結果你的晚餐還在被延",
    createdAt: "2022-05-05T12:28:19.793Z",
  },
  {
    _id: 2,
    user: {
      userName: "Dora",
      _id: "2266",
    },
    content: "原來新北市跟台北市一樣",
    createdAt: "2022-05-05T12:28:19.813Z",
  },
  {
    _id: 3,
    user: {
      userName: "joe",
      _id: "5566",
    },
    content: "等到我花都謝了",
    createdAt: "2022-05-05T12:28:19.999Z",
  },
  {
    _id: 4,
    user: {
      userName: "Dora",
      _id: "2266",
    },
    content: "點外送練習修身養性",
    createdAt: "2022-05-05T12:29:19.793Z",
  },
  {
    _id: 5,
    user: {
      userName: "Dora",
      _id: "2266",
    },
    content: "我在晚餐開店的第一分鐘就點餐了",
    createdAt: "2022-05-05T12:30:19.793Z",
  },
  {
    _id: 6,
    user: {
      userName: "joe",
      _id: "5566",
    },
    content: "雨越大等越久",
    createdAt: "2022-05-05T12:30:19.899Z",
  },
  {
    _id: 7,
    user: {
      userName: "Dora",
      _id: "2266",
    },
    content: "你的晚餐竟然被四延了",
    createdAt: "2022-05-05T12:32:19.793Z",
  },
  {
    _id: 8,
    user: {
      userName: "joe",
      _id: "5566",
    },
    content: "傻眼",
    createdAt: "2022-05-05T12:33:19.793Z",
  },
  {
    _id: 9,
    user: {
      userName: "joe",
      _id: "5566",
    },
    content: "等待時間直接變成一個半小時",
    createdAt: "2022-05-05T12:33:19.793Z",
  },
]);
const closeRoom = () => {
  eventBus.emit("handleRoom", false);
};

const toPrevPage = () => {
  router.go(-1);
};

onMounted(() => {
  // 鎖ios橡皮筋效果
  document.body.style = "overflow: hidden;position:fixed";
});

onBeforeUnmount(() => {
  document.body.style = "";
});
</script>

<template>
  <div
    class="sm:fixed sm:border-2 bottom-0 right-10 w-screen sm:w-[338px] h-screen sm:h-[455px] rounded-tl-lg rounded-tr-lg"
  >
    <div
      class="h-14 flex px-2 sm:px-4 py-2 justify-between items-center border-b-2"
    >
      <div class="flex items-center">
        <IconBack @click="toPrevPage" class="block sm:hidden w-8 h-8 mr-2" />
        <img
          class="avatar w-10 h-10"
          src="https://i.pravatar.cc/150?img=19"
          alt=""
        />
        <span class="pl-4 font-bold">Dora</span>
      </div>
      <span @click="closeRoom" class="text-xs text-gray"
        >對方正在輸入中...</span
      >
      <Close
        class="cursor-pointer hidden sm:block hover:opacity-50"
        @click="closeRoom"
      />
    </div>
    <div class="inner bg-slate-100 overflow-y-auto">
      <template v-for="message in messageList" :key="message._id">
        <chat-room-message :message="message" />
      </template>
    </div>
    <chat-room-input-box />
  </div>
</template>

<style scoped>
.inner {
  height: 350px;
}
@media only screen and (max-width: 640px) {
  .inner {
    height: calc(100vh - 56px - 48px);
  }
}
@supports (-webkit-touch-callout: none) {
  .h-screen {
    height: -webkit-fill-available;
  }
  .inner {
    height: calc(-webkit-fill-available - 56px - 48px);
  }
}
</style>
