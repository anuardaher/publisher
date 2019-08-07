const usersModel = require("../models/users.model")

const getAll = async function() {
    return await usersModel.find({})
}

const findById = async function(id) {
    return await usersModel.findById({ _id: id })
}

const find = async function(data) {
    return await usersModel.find(data)
}

const create = async function(userData) {
    let user = new usersModel(userData)
    user.setPassword(userData.password)
    await user.save()
    return user
}

const remove = async function(id) {
    return await usersModel.findOneAndDelete({ _id: id })
}

const update = async function(id, data) {
    return await usersModel.findOneAndUpdate({ _id: id }, data, { new: true })
}

module.exports = {
    getAll,
    find,
    create,
    remove,
    update,
    findById
}