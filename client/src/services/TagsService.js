import Api from './Api';

export default {
  register(params) {
    return Api().post('api/v1/tags', params);
  },
  load() {
    return Api().get('api/v1/tags');
  },
};
