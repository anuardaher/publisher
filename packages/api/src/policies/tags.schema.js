const Joi = require('joi')

module.exports = {
  register(req, res, next) {
    const schema = {
      name: Joi.string().min(3).max(30).required()
    }

    const { error } = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'name':
          res.status(400).json({ error: 'Você deve enviar um nome válido.' })
          break
        default:
          res.status(400).json({ error: 'Informações inválidas' })
      }
    } else {
      next()
    }
  }
}
