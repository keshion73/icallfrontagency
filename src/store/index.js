import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

import sessionStore from '@/store/modules/sessionStore.js'

const store = new Vuex.Store({
    modules: {
        // 키: 값 형태로 저장됩니다.
        sessionStore: sessionStore
    },
    plugins: [
        createPersistedState({
            paths: ['sessionStore'],
        })
    ]
})

export default store
