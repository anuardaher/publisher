const usersController = require('../../controllers/users.controller')
var router = require('express').Router();

router.get('/', usersController.getAll);
router.get('/:id', usersController.findById);
router.post('/', usersController.save);
router.delete('/:id', usersController.remove);
router.put('/:id', usersController.update);

module.exports = router;