import { defineStore } from 'pinia'

export const PiniaStore = defineStore('GlobalStore', {
  state: () => ({
    userId: null,
    myTeamId: null,
  }),

  actions: {
    setUserId(userId) {
      this.userId = userId;
    },

    setMyTeamId(myTeamId) {
      this.myTeamId = myTeamId;
    },

    clearUserData() {
      this.userId = null;
      this.myTeamId = null;
    },
  },

  getters: {
    getUserId: (state) => state.userId,
    getMyTeamId: (state) => state.myTeamId,
  },

  persist: true
})