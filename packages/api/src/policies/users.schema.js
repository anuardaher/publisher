const Joi = require('joi');

module.exports = {
  register(req, res, next) {
    const schema = Joi.object().keys({
      firstname: Joi.string()
        .min(3)
        .max(20)
        .required(),
      lastname: Joi.string()
        .min(3)
        .max(20)
        .required(),
      username: Joi.string().optional(),
      email: Joi.string()
        .email()
        .required(),
      profession: Joi.string().required(),
      img: Joi.string(),
      provider: Joi.string(),
      termo: Joi.boolean().valid(true),
      address: Joi.object(),
      facebookId: Joi.string().allow(null),
      password: Joi.when('facebookId', {is: Joi.exist(), then: Joi.string().allow(null), otherwise: Joi.string().regex(/^[a-zA-Z0-9]{8,32}$/) }),
      passwordValidation: Joi.ref("password")
    })

    const { error } = schema.validate(req.body);

    if (error) {
      console.log(error)
      switch (error.details[0].context.key) {
        case 'email':
          res
            .status(400)
            .json({ error: 'Você deve inserir um e-mail válido.' });
          break;
        case 'firstname':
          res.status(400).json({ error: 'Insira um nome válido.' });
          break;
        case 'lastname':
          res.status(400).json({ error: 'Insira um sobrenome válido.' });
          break;
        case 'password':
          res.status(400).json({
            error: `A senha inserida não está respeitando uma das seguintes regras: 
            <br>
            1. Somente letras e números são permitidos
            <br>
            2. Deve ter o tamanho mínimo de 8 caracteres e máximo de 32.`,
          });
          break;
        default:
          res.status(400).json({ error: 'Informações inválidas' });
      }
    } else {
      next();
    }
  },
};
