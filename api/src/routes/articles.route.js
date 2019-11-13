const router = require('express').Router();
const articlesController = require('../controllers/articles.controller');
const articlesSchema = require('../policies/articles.schema');
const multer = require("multer");
const passport = require('passport')

router.get('/', articlesController.getAll);
router.get('/:id', articlesController.findById);
router.post('/', [articlesSchema.register, passport.authenticate('jwt', { session: false })], articlesController.save);
router.delete('/:id', passport.authenticate('jwt', { session: false }), articlesController.remove);
router.put('/:id', passport.authenticate('jwt', { session: false }), articlesController.update);
router.post('/search', articlesController.search);
// usando essa rota pq os crawlers não gostam do GET
router.post('/post/:id', articlesController.findOne);
router.post('/week-posts', articlesController.weekPosts);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/articles/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
  });
   
const upload = multer({ storage: storage })

router.post('/coverImage', upload.single('file'), articlesController.uploadImage)

module.exports = router;
