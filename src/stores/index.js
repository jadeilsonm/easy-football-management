import { createStore } from 'vuex';

const store = createStore({
  state: {
    userId: null,
    teamId: null,
  },
  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },
    setTeamId(state, teamId) {
      state.teamId = teamId;
    }
  },
  actions: {
    updateUserId({ commit }, userId) {
      commit('setUserId', userId);
    },
    updateTeamId({ commit }, teamId) {
      commit('setTeamId', teamId);
    }
  },
  getters: {
    getUserId: (state) => state.userId,
    getTeamId: (state) => state.teamId,
  },
});

export default store;
