const sessionStore = {
    namespaced: true,
    state: {
        sessionInfo: {
            userInfo: {},
        },
        isLogin: false
    },
    getters: {
        //GE_USER_NAME: state => state.userName
        GET_SESSION_INFO: state => state.sessionInfo,
        GET_ISLOGIN_INFO: state => state.isLogin
    },
    mutations: {
        // MU_USER_NAME: (state, payload) => {
        //     /*
        //         여기서는 payload를 객체로 받습니다.
        //         payload를 객체로 받으면, mutation를 조금더 유연하게 사용할 수 있기는 합니다.
        //     */
        //     state.userName = payload.userName
        // }
        setSessionStore: (state, payload) => {
            // state.userInfo = payload.loginUserVO;
            // state.menuList = payload.menuList;
            state.sessionInfo = payload;
        },
        setIsLogin: (state, payload) => {
            // state.userInfo = payload.loginUserVO;
            // state.menuList = payload.menuList;
            state.isLogin = payload;
        }
    },
    actions: {
        // AC_USER_NAME: ({ commit }, payload) => {
        //     commit('MU_USER_NAME', payload)
        // }
        ACT_SESSION_INFO: ({ commit }, payload) => {
            commit('setSessionStore', payload)
        },
        ACT_LOGIN_INFO: ({ commit }, payload) => {
            commit('setIsLogin', payload)
        }
    }
}

export default sessionStore