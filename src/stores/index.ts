import { defineStore } from 'pinia'

export const PiniaStore = defineStore('GlobalStore', {
  state: () => ({
    token: null,
    userId: null,
    myTeam: null,
  }),

  actions: {
    setToken(token: any) {
      this.token = token
    },

    setUserId(userId: any) {
      this.userId = userId
    },

    setMyTeam(myTeam: any) {
      this.myTeam = myTeam
    },

    clearUserData() {
      this.userId = null
      this.myTeam = null
      this.token = null
    },
  },

  getters: {
    getUser: (state) => state.userId,
    getMyTeam: (state) => state.myTeam,
    getToken: (state) => state.token,
  },

  persist: true,
})
