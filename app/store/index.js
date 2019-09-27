export const state = () => ({
  token: null,
  user: null,
  isUserLoggedIn: false
})

export const mutations = {
  setToken (state, token) {
    state.token = token
    state.isUserLoggedIn = !!token
  },
  setUser (state, user) {
    state.user = user
  }
}

export const getters = {
  user: state => state.user,
  userId: state => state.user ? state.user._id : null,
  fullName: state => state.user ? `${state.user.firstname} ${state.user.lastname}` : null,
  state: state => state.isUserLoggedIn,
  inicialLetterName: state => state.user ? state.user.firstname.charAt(0).toUpperCase() : null,
  userHasImage: (state) => {
    if (!state.user || !state.user.img) { return null }
    return state.user.provider === 'facebook' ? state.user.img : `${process.env.BASE_URL || 'http://localhost:3001'}/${state.user.img}`
  },
  profession: state => state.user ? state.user.profession : null,
  fullLocation: state => state.user ? `${state.user.address.city} – ${state.user.address.country}` : null,
  provider: state => state.user ? state.user.provider : null,
  role: state => state.user ? state.user.role : null
}

export const actions = {
  setToken ({ commit }, token) {
    commit('setToken', token)
  },
  setUser ({ commit }, user) {
    commit('setUser', user)
  }
}
