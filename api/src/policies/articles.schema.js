const Joi = require('@hapi/joi');

module.exports = {
  register(req, res, next) {
    const schema = {
      title: Joi.string()
        .min(5)
        .max(80)
        .required(),
      subtitle: Joi.string()
      .max(200)
      .allow('')
      .optional(),
      tags: Joi.array(),
      text: Joi.string().required()
        .min(200),
      preview: Joi.optional(),
      author: Joi.object().required(),
      type: Joi.string().required(),
      img: Joi.string(),
    };

    const { error } = Joi.validate(req.body, schema);

    if (error) {
      switch (error.details[0].context.key) {
        case 'title':
          res.status(422).json({ error: 'Você deve inserir um título válido.' });
          break;
        case 'subtitle':
          res.status(422).json({ error: 'Você deve inserir um subtitle válido.' });
          break;
        case 'tags':
          res.status(422).json({ error: 'Insira uma tag válida para a publicação.' });
          break;
        case 'text':
          res.status(422).json({error: `Seu texto deve ter no mínimo 200 caracteres`,});
          break;
        case 'author':
          res.status(422).json({error: `O autor deve ser informado.`,});
          break;
        case 'type':
          res.status(422).json({error: `Você deve informar o tipo da publicação`,});
          break;
        default:
          console.error(error.details[0].message)
          res.status(422).json({ error: 'Informações inválidas' });
      }
    } else {
      next();
    }
  },
};
