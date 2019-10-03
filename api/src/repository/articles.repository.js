const ArticleModel = require('../models/articles.model');

const find = async function(data, projection, options) {
  return ArticleModel.find(data, projection, options).lean();
};

const findById = async function(id, projection, options) {
  return ArticleModel.findById({ _id: id }, projection, options).lean();
};

const findOne = async function(data, projection, options) {
  return ArticleModel.findOne(data, projection, options).lean();
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
