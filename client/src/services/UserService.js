import Api from './Api';

export default {
  editProfile(id, user) {
    return Api().put(`/users/${id}`, user);
  },
  editProfileImage(id, image) {
    return Api().post(`/users/profileImage/${id}`, image, {
      headers: {
        'content-type': 'multipart/form-data',
       }
    })
  },
};
