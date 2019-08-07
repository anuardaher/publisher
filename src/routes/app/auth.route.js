let passport = require('passport');
let router = require('express').Router();

router.get('/facebook',
    passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        console.log(req.user)
        res.redirect('/');
    }
);

router.get('/linkedin',
    passport.authenticate('linkedin'));

router.get('/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/logout', function(req, res) {
    req.logOut(); // exposto pelo passport
    res.redirect('/');
});

router.route('/login')
    .get(function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render();
    })
    .post(passport.authenticate('local-login', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
    }))

router.route('/signup')
    .get(function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render();
    });

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/login');
}

module.exports = router