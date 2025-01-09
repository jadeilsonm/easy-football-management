import { createStore } from 'vuex';

export default createStore({
  state: {
    userId: null,
    myTeamId: null,
  },
  mutations: {
    setUserId(state, id) {
      state.userId = id;
    },
    setMyTeamId(state, id) {
      state.myTeamId = id;
    },
  },
  actions: {
    setUserId({ commit }, id) {
      commit('setUserId', id);
    },
    setMyTeamId({ commit }, id) {
      commit('setMyTeamId', id);
    },
  },
  getters: {
    getUserId(state) {
      return state.userId;
    },
    getMyTeamId(state) {
      return state.myTeamId;
    },
  },
});