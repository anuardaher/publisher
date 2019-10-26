const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const multer = require("multer");

router.get('/', usersController.getAll);
router.get('/:id', usersController.findById);
router.post('/', usersController.save);
router.post('/profile/:username', usersController.findOne);
router.delete('/:id', usersController.remove);
router.put('/:id', usersController.update);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/profiles/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
  });
   
const upload = multer({ storage: storage })

router.post('/profileImage/:id', upload.single('file'), usersController.editProfileImage)

module.exports = router;
