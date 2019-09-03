const Joi = require('@hapi/joi');

module.exports = {
  register(req, res, next) {
    const schema = {
      title: Joi.string()
        .min(5)
        .max(100)
        .required(),
      subtitle: Joi.string()
        .max(200),
      tags: Joi.array()
        .min(1)
        .required(),
      text: Joi.string().required()
        .min(20),
      author: Joi.object().required(),
      type: Joi.string().required(),
      img: Joi.string(),
    };

    const { error } = Joi.validate(req.body, schema);

    if (error) {
      switch (error.details[0].context.key) {
        case 'title':
          res.status(400).json({ error: 'Você deve inserir um título válido.' });
          break;
        case 'subtitle':
          res.status(400).json({ error: 'Você deve inserir um subtitle válido.' });
          break;
        case 'tags':
          res.status(400).json({ error: 'Insira uma tag válida para a publicação.' });
          break;
        case 'text':
          res.status(400).json({error: `Você deve inserir um texto válido.`,});
          break;
        case 'author':
          res.status(400).json({error: `O autor deve ser informado.`,});
          break;
        case 'type':
          res.status(400).json({error: `Você deve informar o tipo da publicação`,});
          break;
        default:
          console.log(error.details[0].message)
          res.status(400).json({ error: 'Informações inválidas' });
      }
    } else {
      next();
    }
  },
};
