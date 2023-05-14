import * as cookie from 'cookie'

export const state = () => ({
  token: null,
  user: null,
  isUserLoggedIn: false,
});

export const mutations = {
  setToken(state, token) {
    state.token = token;
    state.isUserLoggedIn = !!token;
  },
  setUser(state, user) {
    state.user = user;
  },
};

export const getters = {
  user: (state) => state.user,
  userId: (state) => (state.user ? state.user._id : null),
  fullName: (state) =>
    state.user ? `${state.user.firstname} ${state.user.lastname}` : null,
  firstName: (state) => (state.user ? state.user.firstname : null),
  state: (state) => state.isUserLoggedIn,
  inicialLetterName: (state) =>
    state.user ? state.user.firstname.charAt(0).toUpperCase() : null,
  userHasImage: (state) => {
    if (!state.user || !state.user.img) {
      return null;
    }
    return state.user.img;
  },
  profession: (state) => (state.user ? state.user.profession : null),
  fullLocation: (state) =>
    state.user
      ? `${state.user.address.city} – ${state.user.address.country}`
      : null,
  provider: (state) => (state.user ? state.user.provider : null),
  role: (state) => (state.user ? state.user.role : null),
  token: (state) => (state.user ? state.token : null),
  username: (state) => (state.user ? state.user.username : null),
};

export const actions = {
  nuxtServerInit ({ commit, dispatch }, { req }) {
    if (req.headers.cookie) {
      try {
        const state = JSON.parse(cookie.parse(req.headers.cookie)['vuex'])
        commit('setUser', state.user)
        commit('setToken', state.token)
      } catch (e) { }
    }
  },
  setToken({ commit }, token) {
    commit("setToken", token);
  },
  setUser({ commit }, user) {
    commit("setUser", user);
  },
};