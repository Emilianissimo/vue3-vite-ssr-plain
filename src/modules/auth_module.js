import AuthService from "../services/auth_service";
import JwtService from "../services/jwt_service";

let user;

if (import.meta.env.SSR){
    user = false
} else {
    user = JwtService.getTokenData()
}
const initialState = user
    ? { status: { is_authenticated: true}, user }
    : { status: { is_authenticated: false }, user: null }

export const auth = {
    namespaced: true,
    state: initialState,
    actions: {
        login({commit}, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user)
                    return Promise.resolve(user)
                },
                error => {
                    commit('loginFailure')
                    return Promise.reject(error)
                }
            )
        },
        register({commit}, user) {
          return AuthService.register(user).then(
              user => {
                  commit('registerSuccess', user)
                  return Promise.resolve(user)
              },
              error => {
                  commit('registerFailure')
                  return Promise.reject(error)
              }
          )
      },
        logout({commit}){
            AuthService.logout()
            commit('logout')
        },
    },
    mutations: {
      loginSuccess(state, user) {
        state.status.is_authenticated = true;
        state.user = JwtService.getTokenData();
      },
      loginFailure(state) {
        state.status.is_authenticated = false;
        state.user = null;
      },
      registerSuccess(state, user) {
        state.status.is_authenticated = false;
        state.user = null;
      },
      registerFailure(state) {
        state.status.is_authenticated = false;
        state.user = null;
      },
      logout(state) {
        state.status.is_authenticated = false;
        state.user = null;
      },
    }
}
