<script setup>
import { useToast } from 'vue-toastification';
import { nextTick, reactive, onMounted, onBeforeUnmount, ref } from 'vue';
import ChatRoomMessage from './ChatRoomMessage.vue';
import ChatRoomInputBox from './ChatRoomInputBox.vue';
import Close from '../components/icons/IconCross.vue';
import Back from '../components/icons/IconBack.vue';
import IconLoading from '@/components/icons/IconLoading.vue';
import eventBus from '../utils/eventBus';
import { throttle, deviceType } from '../utils/common';
import { API_URL } from '@/global/constant';
import { storeToRefs } from 'pinia';
import { useRoomStore, useUserStore } from '@/stores';
import { useRouter } from 'vue-router';
import { io } from 'socket.io-client';
const toast = useToast();
const useStore = useUserStore();
const roomStore = useRoomStore();
const { room } = storeToRefs(roomStore);
const { user } = storeToRefs(useStore);
const router = useRouter();
const isLoading = ref(false);
const typingFlag = ref(false);
const messageContainer = ref(null);
const fetchAllFlag = ref(false);
const newMsgFlag = ref(false);
const flagHistory = ref(false);
const scrollRecord = ref(0);
const messageList = reactive([]);
let timer = null;

let token = localStorage.getItem('metaWall');
if (!token) {
  toast.error('請先登入喔！');
  router.push('/');
}
token.startsWith('Bearer') && (token = token.split(' ')[1]);

// socket初始化
const socket = io(`${API_URL}/chat`, {
  query: {
    token,
    room: room.value.roomId,
  },
  // autoConnect: false,
  forceNew: true,
});
// 建立連線
socket.on('connect', () => {
  console.log('connect----');
  // TODO 不用setTimeout getHistory會偶發性失效
  setTimeout(() => {
    getHistory();
  }, 200);
});

socket.emit('joinRoom', room.value.roomId);
// 接收到別人傳的訊息
socket.on('chatMessage', (msg) => {
  console.log('接收到別人傳的訊息', msg);
  messageList.push(msg);
  eventBus.emit('updateChatRecord', { roomId: room.value.roomId, msg });
  if (
    messageContainer.value.scrollHeight - messageContainer.value.scrollTop >
    messageContainer.value.clientHeight
  ) {
    user.value._id !== msg.sender && (newMsgFlag.value = true);
  } else {
    scrollBottom();
  }
});

// 接收歷史訊息
socket.on('history', (msgList) => {
  isLoading.value = false;
  console.log('接收到歷史訊息', msgList);
  const newArray = [...msgList, ...messageList];
  Object.assign(messageList, newArray);
  console.log('messageList', messageList);
  msgList.length < 30 && (fetchAllFlag.value = true);
  if (!flagHistory.value) {
    scrollBottom();
    flagHistory.value = true;
  } else {
    scrollToCorrect();
  }
  // 滾輪調整
});

const scrollToCorrect = async () => {
  await nextTick();
  messageContainer.value.scrollTop =
    messageContainer.value.scrollHeight - scrollRecord.value;
};

socket.on('typing', (boolean) => {
  typingFlag.value = boolean;
});

// 接收錯誤
socket.on('error', (error) => {
  toast.error(error);
  router.go('/');
});

const getHistory = () => {
  console.log('getHistory', fetchAllFlag.value);
  if (fetchAllFlag.value) return;
  const info = {
    lastTime: messageList[0]?.createdAt,
  };
  isLoading.value = true;
  console.warn('getHistory---', socket.connected);
  socket.emit('history', info);
};

const endTyping = () => {
  socket.emit('typing', false);
};

const userTyping = (key) => {
  if (key === 'Enter') {
    endTyping();
    return;
  }
  socket.emit('typing', true);
  clearTimeout(timer);
  timer = setTimeout(() => {
    endTyping();
  }, 1500);
};

const sendMessage = (msg) => {
  const sendMsg = {
    message: msg,
    sender: user.value._id,
  };
  socket.emit('chatMessage', sendMsg);
};

const scrollBottom = async () => {
  await nextTick();
  newMsgFlag.value = false;
  messageContainer.value.scrollTop = messageContainer.value?.scrollHeight;
};

const closeRoom = () => {
  eventBus.emit('handleRoom', false);
};

const detectTop = () => {
  messageContainer.value.addEventListener(
    'scroll',
    () => {
      if (messageContainer.value.scrollTop === 0) {
        scrollRecord.value = messageContainer.value.scrollHeight;
        throttle(getHistory, 1000)();
      }
    },
    false
  );
};

const toPrevPage = () => {
  router.go(-1);
};
const provideDefault = () => {
  return (
    room.avatar ??
    new URL('../assets/avatars/user_default.png', import.meta.url)
  );
};

onMounted(() => {
  console.warn('mounted');
  // 鎖ios橡皮筋效果
  deviceType() !== 'desktop' &&
    (document.body.style = 'overflow: hidden;position:fixed');
  detectTop();
});

onBeforeUnmount(() => {
  console.warn('onBeforeUnmount');
  roomStore.updateRoom({});
  socket.emit('leaveRoom', room.value.roomId);
  socket.off();
  socket.disconnect();
  document.body.style = '';
  clearTimeout(timer);
});
</script>

<template>
  <div
    class="bottom-0 right-10 h-screen w-screen overflow-hidden rounded-tl-lg rounded-tr-lg border-black md:fixed md:h-[455px] md:w-[338px] md:border-2"
  >
    <div
      class="flex h-14 items-center justify-between border-b-2 border-black bg-white px-2 py-2 md:px-4"
    >
      <div class="flex items-center">
        <Back @click="toPrevPage" class="mr-2 block h-8 w-8 md:hidden" />
        <img class="avatar h-10 w-10" :src="provideDefault()" alt="" />
        <span class="pl-4 font-bold">{{ room.name }}</span>
      </div>
      <span v-show="typingFlag" class="text-xs text-gray-500"
        >對方正在輸入中...</span
      >
      <Close
        class="hidden h-6 w-6 cursor-pointer hover:opacity-50 md:block"
        @click="closeRoom"
      />
    </div>
    <div
      id="messageContainer"
      ref="messageContainer"
      class="inner relative overflow-y-auto bg-slate-100"
    >
      <div class="text-center" v-if="!isLoading && messageList.length === 0">
        開始聊天吧！
      </div>
      <div
        class="flex items-center justify-center pt-2 text-slate-700"
        v-if="isLoading"
      >
        載入中<IconLoading class="ml-1 h-4 w-4 animate-spin" />
      </div>
      <template v-for="message in messageList" :key="message._id">
        <chat-room-message :message="message" />
      </template>
    </div>
    <div
      v-if="newMsgFlag"
      @click="scrollBottom"
      class="absolute bottom-10 left-0 h-12 w-full bg-black bg-opacity-40 p-2 text-white"
    >
      您有新訊息
    </div>
    <chat-room-input-box @userTyping="userTyping" @sendMessage="sendMessage" />
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
