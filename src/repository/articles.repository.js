const articleModel = require("../models/articles.model")

const find = async function(data) {
    return await articleModel.find(data);
}

const findById = async function(id) {
    return await articleModel.findById({ _id: id });
}

const findOne = async function(data) {
    return await articleModel.findOne(data);
}

const create = async function(data) {
    let article = new articleModel(data);
    await article.save();
    return article;
}

const remove = async function(id) {
    return await articleModel.findOneAndDelete({ _id: id });
}

const update = async function(id, data) {
    return await articleModel.findOneAndUpdate({ _id: id }, data, { new: true });
}

module.exports = {
    find,
    findOne,
    create,
    remove,
    update,
    findById
}