import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

const cookieStorage = {
  getItem (key) {
    return Cookies.getJSON(key)
  },
  setItem (key, value) {
    return Cookies.set(key, value, { expires: 3, secure: false })
  },
  removeItem (key) {
    return Cookies.remove(key)
  }
}

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      storage: cookieStorage,
      getState: cookieStorage.getItem,
      setState: cookieStorage.setItem
    })(store)
  })
}
