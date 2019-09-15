const Joi = require('@hapi/joi');

module.exports = {
  register(req, res, next) {
    const schema = {
      firstname: Joi.string()
        .min(3)
        .max(20)
        .required(),
      lastname: Joi.string()
        .min(3)
        .max(20)
        .required(),
      email: Joi.string()
        .email()
        .required(),
      profession: Joi.string(),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')),
    };

    const { error } = Joi.validate(req.body, schema);

    if (error) {
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
