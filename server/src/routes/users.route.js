const router = require('express').Router();
const usersController = require('../controllers/users.controller');

router.get('/', usersController.getAll);
router.get('/:id', usersController.findById);
router.post('/', usersController.save);
router.delete('/:id', usersController.remove);
router.put('/:id', usersController.update);

module.exports = router;
