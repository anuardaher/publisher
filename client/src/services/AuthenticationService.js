import Api from './Api';

export default {
  register(credentials) {
    return Api().post('/api/v1/auth/register', credentials);
  },
  login(credentials) {
    return Api().post('/api/v1/auth/login', credentials);
  },
  facebook() {
    return Api().get('/api/v1/auth/facebook')
  },
  editPassword(id, password) {
    return Api().put(`/api/v1/auth/${id}`, { password });
  },
};
