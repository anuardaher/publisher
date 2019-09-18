const usersRepository = require('../repository/users.repository');
const formatter = require('../helpers/formatter');
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
      .json({ data: users.map(user => formatter(user, 'user')) });
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
};

const findById = async (req, res) => {
  let user;
  try {
    user = await usersRepository.findById(req.params.id);
    return res.status(200).json({ data: formatter(user, 'user') });
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
};

const save = async (req, res) => {
  let user;
  try {
    user = await usersRepository.create(req.body);
    return res.status(201).json(formatter(user, 'user'));
  } catch (e) {
    return res.status(400).json({ error: 'Esse e-mail já está sendo usado.' });
  }
};

const remove = async (req, res) => {
  let user;
  try {
    user = await usersRepository.remove(req.params.id);
  } catch (e) {
    console.error(e);
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
  try {
    user = await usersRepository.update(req.params.id, req.body);
  } catch (e) {
    console.error(e);
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
  return res.status(201).json(formatter(user, 'user'));
};

const editProfileImage = async (req, res) => {
  const { id } = req.params;
  if (!req.file) return res.status(500).send();
  let imgLink = req.file.path;
  try {
    const user = await usersRepository.findById(id);
    if (!user) return res.status(500).send();
    if (user.img) {
      await unlinkAsync(path.join( __dirname, user.img));
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
    console.error(error);
    return res.status(500).send();
  }
};

module.exports = {
  getAll,
  save,
  remove,
  findById,
  update,
  editProfileImage,
};
