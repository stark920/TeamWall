import { defineStore } from 'pinia';
export default defineStore('room', {
  state: () => {
    return {
      room: [],
    };
  },
  persist: true,
  actions: {
    updateRoom(roomArr) {
      this.room = roomArr;
    },
  },
});
