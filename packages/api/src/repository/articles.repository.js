const ArticleModel = require('../models/articles.model')

const find = async function (data, projection, options) {
  return ArticleModel.find(data, projection, options).lean()
}

const findById = async function (id, projection, options) {
  return ArticleModel.findById({ _id: id }, projection, options).lean()
}

const findOne = async function (data, projection, options) {
  return ArticleModel.findOne(data, projection, options).lean()
}

const create = async function (data) {
  const article = new ArticleModel(data)
  return article.save()
}

const remove = async function (id) {
  return ArticleModel.findOneAndDelete({ _id: id })
}

const update = async function (id, data) {
  return ArticleModel.findOneAndUpdate({ _id: id }, data, { new: true })
}

const list = (match = {}, project = {}, options = {}) => {
  return ArticleModel.aggregate([
    { $match: match },
    {
      $lookup: {
        from: 'users',
        localField: 'author.id',
        foreignField: '_id',
        as: 'author'
      }
    },
    { $unwind: '$author' },
    {
      $project: {
        'author.password': 0,
        'author.salt': 0,
        'author.role': 0,
        ...project
      }
    },
    { $limit: options.limit || 5 },
    { $skip: options.skip || 0 },
    { $sort: options.sort || 1 }
  ])
}

const weekly = () => {
  const currentDate = new Date()
  const beggingOfTheWeek = currentDate.setDate(currentDate.getDate() - 7)

  return ArticleModel.aggregate([
    {
      $project: {
        thumbs: 1,
        title: 1,
        createdAt: 1,
        active: 1
      }
    },
    {
      $match: {
        createdAt: {
          $gte: new Date(beggingOfTheWeek),
          $lte: new Date()
        },
        active: true
      }
    },
    {
      $addFields: {
        thumbsCount: { $size: { $ifNull: ['$thumbs', []] } }
      }
    },
    {
      $sort: {
        thumbsCount: -1
      }
    },
    {
      $limit: 5
    }
  ])
}

module.exports = {
  find,
  findOne,
  create,
  remove,
  update,
  findById,
  list,
  weekly
}
