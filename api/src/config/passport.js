const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const userRepository = require('../repository/users.repository');
const FacebookStrategy = require('passport-facebook');

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async function(jwtPayload, done) {
      try {
        const user = await userRepository.findOne({
          id: jwtPayload.id,
        });
        if (!user) {
          return done(new Error(), false);
        }
        return done(null, user);
      } catch (err) {
        return done(new Error(), false);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.HOST}/api/v1/auth/facebook/callback`,
      profileFields: ['id', 'first_name', 'last_name', 'email', 'picture.type(large)'],
    },
    async (accessToken, refreshToken, profile, cb) => {
      const data = profile._json;
      try {
        let user = await userRepository.findOne({ email: data.email });
        if (user) return cb(null, user);
        user = {
          provider: 'facebook',
          firstname: data.first_name,
          lastname: data.last_name,
          email: data.email,
          img: data.picture.data.url,
          facebook: { id: profile.id, token: accessToken },
        };
        return cb(null, user);
      } catch (error) {
        return cb(error, null)
      }
    }
  )
);

module.exports = null;
