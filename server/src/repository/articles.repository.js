const ArticleModel = require('../models/articles.model');

const find = async function(data) {
  return ArticleModel.find(data);
};

const findById = async function(id) {
  return ArticleModel.findById({ _id: id });
};

const findOne = async function(data) {
  return ArticleModel.findOne(data);
};

const create = async function(data) {
  const article = new ArticleModel(data);
  return article.save();
};

const remove = async function(id) {
  return ArticleModel.findOneAndDelete({ _id: id });
};

const update = async function(id, data) {
  return ArticleModel.findOneAndUpdate({ _id: id }, data, { new: true });
};

module.exports = {
  find,
  findOne,
  create,
  remove,
  update,
  findById
};
