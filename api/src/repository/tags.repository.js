const TagsModel = require('../models/tags.model');

const find = async data => TagsModel.find(data);

const findById = async id => TagsModel.findById({ _id: id });

const findOne = async data => TagsModel.findOne(data);

const create = async data => {
  const tag = new TagsModel(data);
  return tag.save();
};

const remove = async id => TagsModel.findOneAndDelete({ _id: id });

const update = async (id, data) => {
  return TagsModel.findOneAndUpdate({ _id: id }, data, {new: true});
};

module.exports = { find, findOne, create, remove, update, findById };
