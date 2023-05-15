const usersRepository = require('../repository/users.repository')
const cloudinary = require('cloudinary').v2

const getAll = async (req, res) => {
  const { data = {}, projection = null } = req.query
  try {
    let users = await usersRepository.find(
      JSON.parse(data),
      JSON.parse(projection)
    )
    return res.status(200).json(users)
  } catch (e) {
    console.error(e.message)
    return res.status(500)
  }
}

const findById = async (req, res) => {
  try {
    const { projection = null } = req.query
    const user = await usersRepository.findById(
      req.params.id,
      JSON.parse(projection)
    )
    return res.status(200).json(user)
  } catch (e) {
    console.error(e.message)
    return res.status(500)
  }
}

const findOne = async (req, res) => {
  const { params } = req
  const projection = { password: 0, salt: 0 }
  try {
    const user = await usersRepository.findOne(params, projection)
    return res.status(200).json(user)
  } catch (e) {
    console.error(e.message)
    return res.status(500)
  }
}

const save = async (req, res) => {
  try {
    const user = await usersRepository.create(req.body)
    return res.status(201).json(user)
  } catch (e) {
    return res.status(400).json({ error: 'Esse e-mail já está sendo usado.' })
  }
}

const remove = async (req, res) => {
  let user
  try {
    user = await usersRepository.remove(req.params.id)
  } catch (e) {
    console.error(e.message)
    return res.status(500)
  }
  if (!user)
    return res.status(404).json({
      success: false,
      message: `User not found for id: ${req.params.id}`
    })
  console.log(
    `Deleted user: ${user.firstname} ${user.lastname}, ${user.email} `
  )
  return res.status(204).json()
}

const update = async (req, res) => {
  let user
  try {
    user = await usersRepository.update(req.params.id, req.body)
  } catch (e) {
    console.error(e.message)
    return res.status(500)
  }
  if (!user)
    return res.status(404).json({
      success: false,
      message: `User not found for id: ${req.params.id}`
    })
  console.log(
    `Updated user: ${user.firstname} ${user.lastname}, ${user.email} `
  )
  return res.status(201).json(user)
}

const editProfileImage = async (req, res) => {
  const { id } = req.params
  if (!req.file) return res.status(500).send()
  try {
    cloudinary.uploader
      .upload_stream(
        { resource_type: 'raw', format: 'jpg' },
        async (err, result) => {
          const newUser = await usersRepository.update(id, { img: result.url })
          if (!newUser) return res.status(500).send()
          newUser.password = ''
          newUser.salt = ''
          return res.status(200).json(newUser)
        }
      )
      .end(req.file.buffer)
  } catch (error) {
    console.error(error.message)
    return res.status(500).send()
  }
}

module.exports = {
  getAll,
  save,
  remove,
  findById,
  findOne,
  update,
  editProfileImage
}
