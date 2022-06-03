import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { storeToRefs } from 'pinia';
import { deviceType } from '@/utils/common';
import { useRoomStore } from '@/stores';
const roomStore = useRoomStore();
const { room } = storeToRefs(roomStore);
const router = useRouter();
const toast = useToast();
const useChat = () => {
  const isRoomExist = (roomId) => {
    const roomArr = room.value.map((item) => item.roomId);
    return roomArr.includes(roomId);
  };
  const handleRoom = (data) => {
    const { roomId, name, avatar } = data;
    if (isRoomExist(roomId)) {
      return;
    }
    if (room.value.length === 3) {
      toast.error('您最多只能跟三個人聊天呦！');
      return;
    }
    const roomObj = { roomId, name, avatar };
    roomStore.updateRoom([...room.value, roomObj]);
    if (deviceType() !== 'desktop') {
      router.push('/chat-room');
    }
  };
  return {
    handleRoom,
  };
};

export default useChat;
