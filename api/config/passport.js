const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/User.model");

function configurePassport() {
  passport.use(
    new LocalStrategy(async (username, password, cb) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return cb(null, false);
        }
        if (user.password === password) return cb(null, user);
        return cb(null, false, {
          message: "Incorrect username or password.",
        });
      } catch (error) {
        return cb(error);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    });
  });
}

module.exports.configurePassport = configurePassport;
