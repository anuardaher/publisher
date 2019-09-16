import Api from './Api';

export default {
  publish(article) {
    return Api().post('/articles', article);
  },
  load(parameters) {
    return Api().get('/articles', { params: parameters });
  },
  findById(id) {
    return Api().get(`/articles/${id}`);
  },
  uploadImage(img){
    return Api().post('/articles/coverImage', img, {
      headers: {
        'content-type': 'multipart/form-data' }});
  },
  search(parameters) {
    return Api().post('/articles/search', parameters);
  },
  delete(id) {
    return Api().delete(`/articles/${id}`)
  }
};
