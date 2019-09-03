import Api from './Api';

export default {
  publish(article) {
    return Api().post('/api/v1/articles', article);
  },
  load(parameters) {
    return Api().get('/api/v1/articles', { params: parameters });
  },
  findById(id) {
    return Api().get(`/api/v1/articles/${id}`);
  },
  uploadImage(img){
    return Api().post('/api/v1/articles/coverImage', img, {
      headers: {
        'content-type': 'multipart/form-data' }});
  }
};
