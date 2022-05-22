import { defineStore } from 'pinia';

export default defineStore('user', {
  id: 'user',
  state: () => ({
    user: {},
  }),
  actions: {
    updateUser(obj) {
      this.user = obj;
    },
  },
});
