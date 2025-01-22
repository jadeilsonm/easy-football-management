import { defineStore } from 'pinia'

export const PiniaStore = defineStore('GlobalStore', {
  state: () => ({
    userId: null,
    myTeam: null,
  }),

  actions: {
    setUserId(userId) {
      this.userId = userId;
    },

    setMyTeam(myTeam) {
      this.myTeam = myTeam;
    },

    clearUserData() {
      this.userId = null;
      this.myTeam = null;
    },
  },

  getters: {
    getUser: (state) => state.userId,
    getMyTeam: (state) => state.myTeam,
  },

  persist: true
})