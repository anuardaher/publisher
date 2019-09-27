const UserModel = require('../models/users.model');

const find = async (data, projection) => {
  return UserModel.find(data, projection);
};

const findById = async (id, projection) => {
  return UserModel.findById(id, projection);
};

const findOne = async (data, projection) => {
  return UserModel.findOne(data, projection);
};

const create = async data => {
  const user = new UserModel(data);
  if (data.password)
    user.setPassword(data.password);
  return user.save();
};

const remove = async (id, projection) => {
  return UserModel.findOneAndDelete({ _id: id }, projection);
};

const update = async (id, data, projection) => {
  return UserModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
    fields: projection
  });
};

module.exports = { find, findOne, create, remove, update, findById };
