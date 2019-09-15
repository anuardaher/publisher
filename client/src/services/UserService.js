import Api from './Api';

export default {
  editProfile(id, user) {
    return Api().put(`api/v1/users/${id}`, user);
  },
  editProfileImage(id, image) {
    return Api().post(`api/v1/users/profileImage/${id}`, image, {
      headers: {
        'content-type': 'multipart/form-data',
       }
    })
  },
};
