const router = require('express').Router();
const articlesController = require('../controllers/articles.controller');
const articlesSchema = require('../policies/articles.schema');
const multer = require("multer");

router.get('/', articlesController.getAll);
router.get('/:id', articlesController.findById);
router.post('/', articlesSchema.register, articlesController.save);
router.delete('/:id', articlesController.remove);
router.put('/:id', articlesController.update);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
  });
   
const upload = multer({ storage: storage })

router.post('/coverImage', upload.single('file'), articlesController.uploadImage)

module.exports = router;
