import { ref, computed } from 'vue'
import { createStore } from 'vuex'

export default createStore({
    state: {
        user: null
    },
    mutations: {
        SET_USER(state, user) {
            state.user = user
        },
        CLEAR_USER(state) {
            state.user = null
        }
    },
    actions: {
        async login({comit}, datails) {
            //
        },
        async register({comit}, datails) {
            //
        },
        async logout({comit}) {
            //
        },
    },
    modules: {}
})