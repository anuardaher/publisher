import Api from './Api';

export default {
  save(tag) {
    return Api().post('/tags', tag);
  },
  load() {
    return Api().get('/tags');
  },
};
