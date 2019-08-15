const usersRepository = require('../repository/users.repository');
const formatter = require('../helpers/formatter');

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
  let user;
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

module.exports = {
  getAll,
  save,
  remove,
  findById,
  update,
};
