const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const userRepository = require('../repository/users.repository')
const FacebookStrategy = require('passport-facebook')

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    async function (jwtPayload, done) {
      try {
        const user = await userRepository.findOne({
          id: jwtPayload.id
        })
        if (!user) {
          return done(new Error(), false)
        }
        return done(null, user)
      } catch (err) {
        return done(new Error(), false)
      }
    }
  )
)

module.exports = null
