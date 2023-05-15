const router = require('express').Router()
const articlesController = require('../controllers/articles.controller')
const articlesSchema = require('../policies/articles.schema')
const passport = require('passport')
const multerUploads = require('../config/multer.js')

router.get('/', articlesController.getAll)
router.get('/:id', articlesController.findById)
router.post(
  '/',
  [articlesSchema.register, passport.authenticate('jwt', { session: false })],
  articlesController.save
)
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  articlesController.remove
)
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  articlesController.update
)
router.post('/search', articlesController.search)
// usando essa rota pq os crawlers não gostam do GET
router.post('/post/:id', articlesController.findOne)
router.post('/week-posts', articlesController.weekPosts)

router.post('/coverImage', multerUploads, articlesController.uploadImage)

module.exports = router
