const router = require('express').Router();
const usersController = require('../controllers/users.controller');
const multerUploads = require("../config/multer.js");

router.get('/', usersController.getAll);
router.get('/:id', usersController.findById);
router.get('/:email', usersController.findOne);
router.post('/', usersController.save);
router.post('/profile/:username', usersController.findOne);
router.delete('/:id', usersController.remove);
router.put('/:id', usersController.update);
router.post('/post/:id', usersController.findById);
router.post('/profileImage/:id', multerUploads, usersController.editProfileImage)

module.exports = router;
