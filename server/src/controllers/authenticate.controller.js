const jwt = require('jsonwebtoken');
const userRepository = require('../repository/users.repository');

function jwtSignUser(user) {
  console.log(user);
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async register(req, res) {
    try {
      const user = await userRepository.create(req.body);
      res.status(200).json({
        user,
        token: jwtSignUser(user),
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
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
          error: 'Email informado está incorreto.',
        });
      }

      const isPasswordValid = await user.validatePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Senha incorreta! Tente novamente.',
        });
      }

      res.send({
        user,
        token: jwtSignUser(user),
      });
    } catch (err) {
      return res.status(500).send({
        error: 'Erro interno do servidor.',
      });
    }
  },
};
