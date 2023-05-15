const router = require('express').Router()
const transporter = require('../services/nodemailer')
const contactPolicy = require('../policies/contact.schema')

router.post('/contact', contactPolicy.register, async (req, res) => {
  const { name, email, message } = req.body

  try {
    let info = await transporter.sendMail({
      from: email, // sender address
      to: process.env.EMAIL_USER, // list of receivers
      subject: 'Contato', // Subject line
      html: `<h1> Contato </h1>
      <h3> Você recebeu um contato do site UC Advogados </h3>
      <p><b>Nome</b>: ${name} </p>
      <p><b>Email</b>: ${email} </p>
      <p><b>Mensagem</b>: ${message}</p>` // html body
    })
    console.log('Messagem enviada: %s', info.messageId)
    res.sendStatus(200)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
