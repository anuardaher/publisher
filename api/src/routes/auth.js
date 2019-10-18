const router = require('express').Router();
const authenticateController = require('../controllers/authenticate.controller');
const userSchema = require('../policies/users.schema');
const passport = require('passport');

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: process.env.HOST,
    session: false,
  }),
  (req, res) => {
    if (req.user._id) {
      res.redirect(`${process.env.HOST}/?user=${req.user._id}`);
    } else {
      req.body = req.user;
      authenticateController.register(req, res);
    }
  }
);

router.post('/login', authenticateController.login);
router.post('/register', userSchema.register, authenticateController.register);
router.get('/socialLogin/:id', authenticateController.socialLogin);
router.put('/:id', authenticateController.updatePassword)

module.exports = router;
