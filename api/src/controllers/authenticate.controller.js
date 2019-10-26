const jwt = require('jsonwebtoken');
const userRepository = require('../repository/users.repository');

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async register(req, res) {
    const createUsername = (name) => {
      name = name.toLowerCase()
      name = name.replace(/\s/g,'')
      let normalizedName = name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      return `${normalizedName}.${Math.floor(Math.random() * (10 - 1) + 1)}`
    }
    try {
      req.body.username = createUsername(req.body.firstname +'.'+ req.body.lastname)
      const user = await userRepository.create(req.body);
      if (!user)
        return res.status(500).json({ error: 'Erro interno do servidor.' });
      user.password = '';
      user.salt = '';
      console.log(user);
      if (user.provider != 'cadastro') {
        return res.redirect(`${process.env.HOST}/?user=${user._id}`);
      }
      return res.status(200).json({
        user,
        token: jwtSignUser(user),
      });
    } catch (err) {
      console.log(err.message);
      return res.status(400).send({
        error: 'Esse e-mail já está em uso.',
      });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userRepository.findOne({ email });
      if (!user) {
        return res.status(403).send({
          error: 'E-mail ou senha incorretos.',
        });
      }
      if (user.provider != 'cadastro') {
        return res.status(403).send({
          error: `Faça o login pelo ${user.provider}.`,
        });
      }
      const isPasswordValid = await user.validatePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'E-mail ou senha incorretos.',
        });
      }
      user.password = '';
      user.salt = '';
      res.send({
        user,
        token: jwtSignUser(user),
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: 'Erro interno do servidor.',
      });
    }
  },
  async socialLogin(req, res) {
    const { id } = req.params;
    const user = await userRepository.findById(id);
    if (!user) return res.status(404);
    return res.status(200).json({
      user,
      token: jwtSignUser(user),
    });
  },
  async updatePassword(req, res) {
    const {password} = req.body;
    const {id} = req.params;
    const user = await userRepository.findById(id);

    if (!user) return res.status(404);
    if (!user.validatePassword(password.old)) {
      return res.status(422).json({
        error: 'Senha atual não está correta'
      })
    }
    if (password.new != password.validator) {
      return res.status(422).json({
        error: 'As novas senhas não conferem'
      })
    }
    user.setPassword(password.new)
    const newUser = await userRepository.update(id, user);
    return res.status(200).json(newUser);
  }
};
