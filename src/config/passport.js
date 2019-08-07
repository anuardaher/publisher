let passport = require('passport');
let userModel = require('../models/users.model');
let userRepository = require('../repository/users.repository')
let LocalStrategy = require('passport-local');
let FacebookStrategy = require('passport-facebook').Strategy;
let LinkedInStrategy = require('passport-linkedin').Strategy;

module.exports = function() {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async(id, done) => {
        const user = await userRepository.find({ _id: id })
        done(err, user);
    });

    passport.use(new FacebookStrategy({
            clientID: "APP_ID",
            clientSecret: "SECRET_KEY",
            callbackURL: `http://${process.env.HOST}:${process.env.PORT}/auth/facebook/callback`
        },
        async(accessToken, refreshToken, profile, done) => {
            console.log(profile)
                // TODO: do sth with returned values
        }));

    passport.use(new LinkedInStrategy({
            consumerKey: 'LINKEDIN_API_KEY',
            consumerSecret: 'LINKEDIN_SECRET_KEY',
            callbackURL: `http://${process.env.HOST}:${process.env.PORT}/auth/linkedin/callback`
        },
        async(token, tokenSecret, profile, done) => {
            const user = await userRepository.find({ 'linkedin.id': profile.id }, function(err, user) {
                return done(err, user);
            });
        }
    ));

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        async(req, email, password, done) => {
            const user = await userRepository.find({ 'local.email': email })
                // if there are any errors, return the error before anything else
            if (!user)
                return done(null, false, req.flash('loginMessage', 'Usuário não encontrado.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validatePassword(password))
                return done(null, false, req.flash('loginMessage', 'Senha incorreta.')); // create the loginMessage and save it to session as flashdata
            // all is well, return successful user
            return done(null, user);
        }));
};