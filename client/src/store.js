import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      state.isUserLoggedIn = !!token;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  getters: {
    userId(state) {
      if (!state.user) {
        return null;
      }
      return state.user._id;
    },
    fullName(state) {
      if (!state.user) {
        return null;
      }
      return `${state.user.firstname} ${state.user.lastname}`;
    },
    state(state) {
      return state.isUserLoggedIn;
    },
    inicialLetterName(state) {
      if (!state.user) {
        return null;
      }
      let firstNameLetter = state.user.firstname.charAt(0);
      let lastNameLetter = state.user.lastname.charAt(0);
      return firstNameLetter.concat(lastNameLetter).toUpperCase();
    },
    userHasImage(state) {
      if (state.user && state.user.img) {
        return state.user.provider == 'facebook' ? state.user.img : `${process.env.VUE_APP_IMAGE_HOST}${state.user.img}`;
      }
      return false;
    },
    profession(state) {
      if (!state.user) {
        return null
      }
      return state.user.profession;
    },
    fullLocation(state) {
      if (!state.user) {
        return null;
      }
      return state.user.address ? `${state.user.address.city} – ${state.user.address.country}` : null;
    }
  },
  actions: {
    setToken({ commit }, token) {
      commit('setToken', token);
    },
    setUser({ commit }, user) {
      commit('setUser', user);
    },
  },
});
