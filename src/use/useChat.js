import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { storeToRefs } from 'pinia';
import { deviceType } from '@/utils/common';
import { useRoomStore } from '@/stores';
const useChat = () => {
  const roomStore = useRoomStore();
  const router = useRouter();
  const { room } = storeToRefs(roomStore);
  const toast = useToast();
  const isRoomExist = (roomId) => {
    const roomArr = room.value.map((item) => item.roomId);
    return roomArr.includes(roomId);
  };
  const handleRoom = (data) => {
    const { roomId, name, avatar } = data;
    const roomObj = { roomId, name, avatar };
    const device = deviceType();
    console.log('device', device);
    if (device === 'desktop') {
      if (isRoomExist(roomId)) {
        return;
      }

      if (room.value.length === 3) {
        toast.error('您最多只能跟三個人聊天呦！');
        return;
      }
      roomStore.updateRoom([...room.value, roomObj]);
      return;
    }
    roomStore.updateRoom([roomObj]);
    console.log('router', router);
    router.push('/chat-room');
  };
  return {
    handleRoom,
  };
};

export default useChat;
