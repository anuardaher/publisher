const usersRepository = require('../repository/users.repository');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

const unlinkAsync = promisify(fs.unlink)

const getAll = async (req, res) => {
  let users;
  try {
    users = await usersRepository.find({});
    return res
      .status(200)
      .json({users});
  } catch (e) {
    console.error(e.message);
    return res.status(500);
  }
};

const findById = async (req, res) => {
  try {
    const {projection} = req.query
    const user = await usersRepository.findById(req.params.id, projection);
    return res.status(200).json(user);
  } catch (e) {
    console.error(e.message);
    return res.status(500);
  }
};

const findOne = async (req, res) => {
  console.log('passei aqui')
  const data = {username: req.params.username}
  const projection = {password: 0, salt: 0}
  try {
    const user = await usersRepository.findOne(data, projection);
    return res.status(200).json(user);
  } catch (e) {
    console.error(e.message);
    return res.status(500);
  }
};

const save = async (req, res) => {
  try {
    const user = await usersRepository.create(req.body);
    return res.status(201).json(user);
  } catch (e) {
    return res.status(400).json({ error: 'Esse e-mail já está sendo usado.' });
  }
};

const remove = async (req, res) => {
  let user;
  try {
    user = await usersRepository.remove(req.params.id);
  } catch (e) {
    console.error(e.message);
    return res.status(500);
  }
  if (!user)
    return res.status(404).json({
      success: false,
      message: `User not found for id: ${req.params.id}`,
    });
  console.log(
    `Deleted user: ${user.firstname} ${user.lastname}, ${user.email} `
  );
  return res.status(204).json();
};

const update = async (req, res) => {
  let user;
  try {
    user = await usersRepository.update(req.params.id, req.body);
  } catch (e) {
    console.error(e.message);
    return res.status(500);
  }
  if (!user)
    return res.status(404).json({
      success: false,
      message: `User not found for id: ${req.params.id}`,
    });
  console.log(
    `Updated user: ${user.firstname} ${user.lastname}, ${user.email} `
  );
  return res.status(201).json(user);
};

const editProfileImage = async (req, res) => {
  const { id } = req.params;
  if (!req.file) return res.status(500).send();
  let imgLink = req.file.path;
  try {
    const user = await usersRepository.findById(id);
    if (!user) return res.status(500).send();
    if (user.img && !/https/.test(user.img)) {
      await unlinkAsync(path.join(process.cwd(), user.img));
    }
    const newUser = await usersRepository.update(
      id,
      { img: imgLink },
    );
    if (!newUser) return res.status(500).send();
    newUser.password = '';
    newUser.salt = '';
    return res.status(200).json(newUser);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send();
  }
};

module.exports = {
  getAll,
  save,
  remove,
  findById,
  findOne,
  update,
  editProfileImage,
};
