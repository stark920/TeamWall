import { defineStore } from 'pinia';

export default defineStore('user', {
  id: 'user',
  state: () => ({
    user: {
      _id: '5566',
      userName: 'joe',
    },
  }),
  actions: {
    updateUser(obj) {
      this.user = obj;
    },
  },
});
