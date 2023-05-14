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
      console.log('Criando usuário', user);
      return res.status(200).json({
        user,
        token: jwtSignUser(user),
      });
    } catch (err) {
      console.log(err.message);
      return res.status(400).send({
        error: 'Esse e-mail já está em uso',
      });
    }
  },
  async login(req, res) {
    try {
      let user;
      const { email, password, facebookId } = req.body;
      if (facebookId) {
        user = await userRepository.findOne({ email, facebookId });
        if (!user) {
          return res.status(403).send('Usuário ainda não cadastrado.');
        }
      } else {
        user = await userRepository.findOne({ email });
        if (!user) {
          return res.status(403).send('E-mail ou senha incorretos.');
        }
      }
      // se for login por rede social...
      if (user.provider != 'cadastro') {
        user.password = '';
        user.salt = '';
          return res.send({
            user,
            token: jwtSignUser(user),
          });
        }
      const isPasswordValid = await user.validatePassword(password);
      if (!isPasswordValid) {
        return res.status(403).send('E-mail ou senha incorretos.');
      }
      user.password = '';
      user.salt = '';
      res.send({
        user,
        token: jwtSignUser(user),
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send('Erro interno do servidor.');
    }
  },
  async updatePassword(req, res) {
    const {password} = req.body;
    const {id} = req.params;
    const user = await userRepository.findOne({_id: id});

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
