const Joi = require('joi')

module.exports = {
  register(req, res, next) {
    const schema = {
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      message: Joi.string().required()
    }

    const { error } = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'name':
          res.status(400).json({ error: 'Você deve enviar um nome válido.' })
          break
        case 'email':
          res.status(400).json({ error: 'Você deve enviar um email válido.' })
        case 'message':
          res.status(400).json({ error: 'Você deve enviar um texto válido.' })
        default:
          res.status(400).json({ error: 'Informações inválidas' })
      }
    } else {
      next()
    }
  }
}
