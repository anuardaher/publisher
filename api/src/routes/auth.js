const router = require('express').Router();
const authenticateController = require('../controllers/authenticate.controller');
const userSchema = require('../policies/users.schema');
const passport = require('passport');

router.post('/login', authenticateController.login);
router.post('/register', userSchema.register, authenticateController.register);
router.put('/:id', authenticateController.updatePassword)

module.exports = router;
