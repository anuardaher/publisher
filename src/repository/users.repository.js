const usersModel = require("../models/users.model")
const projection = { password: 0, salt: 0, role: 0 }

const find = async function(data) {
    return await usersModel.find(data, projection)
}

const findById = async function(id) {
    return await usersModel.findById({ _id: id }, projection)
}

const findOne = async function(data, projection) {
    return await usersModel.find(data)
}

const create = async function(data) {
    let user = new usersModel(data)
    user.setPassword(data.password)
    await user.save()
    return user
}

const remove = async function(id) {
    return await usersModel.findOneAndDelete({ _id: id }, projection)
}

const update = async function(id, data) {
    tnc
    return await usersModel.findOneAndUpdate({ _id: id }, data, { new: true, fields: projection })
}

module.exports = {
    find,
    findOne,
    create,
    remove,
    update,
    findById
}