import { defineStore } from 'pinia';

export default defineStore('user', {
  id: 'user',
  state: () => ({
    user: {},
  }),
  persist: true,
  actions: {
    updateUser(obj) {
      this.user = obj;
    },
  },
});
