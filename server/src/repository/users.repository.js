const UserModel = require('../models/users.model');

const projection = { password: 0};

const find = async data => {
  return UserModel.find(data, projection);
};

const findById = async id => {
  return UserModel.findById({ _id: id }, projection);
};

const findOne = async data => {
  return UserModel.findOne(data);
};

const create = async data => {
  const user = new UserModel(data);
  user.setPassword(data.password);
  return user.save();
};

const remove = async id => {
  return UserModel.findOneAndDelete({ _id: id }, projection);
};

const update = async (id, data) => {
  return UserModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
    fields: projection
  });
};

module.exports = { find, findOne, create, remove, update, findById };
