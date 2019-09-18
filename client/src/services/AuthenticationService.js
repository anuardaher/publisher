import Api from './Api';

export default {
  register(credentials) {
    return Api().post('/auth/register', credentials);
  },
  login(credentials) {
    return Api().post('/auth/login', credentials);
  },
  facebook() {
    return Api().get('/auth/facebook')
  },
  editPassword(id, password) {
    return Api().put(`/auth/${id}`, { password });
  },
  socialLogin(id) {
    return Api().get(`/auth/socialLogin/${id}`)
  }
};
