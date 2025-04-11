import { defineStore } from 'pinia'

export const PiniaStore = defineStore('GlobalStore', {
  state: () => ({
    token: null,
    userId: null,
    myTeam: null,
  }),

  actions: {
    setToken(token) {
      this.token = token;
    },

    setUserId(userId) {
      this.userId = userId;
    },

    setMyTeam(myTeam) {
      this.myTeam = myTeam;
    },

    clearUserData() {
      this.userId = null;
      this.myTeam = null;
      this.token = null;
    },
  },

  getters: {
    getUser: (state) => state.userId,
    getMyTeam: (state) => state.myTeam,
    getToken: (state) => state.token,
  },

  persist: true
})
