const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    if (user) {
      done(null, user);
    } else {
      done({error: "No user found"});
    }
  })
});

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback',
  proxy: true
}, async (accessToken, refreshToken, profile, done) => {
  const googleId = profile.id;
  const existingUser = await User.findOne({ googleId });
  if (existingUser) {
    existingUser.accessToken = accessToken;
    existingUser.refreshToken = refreshToken;
    const updatedUser = await existingUser.save();
    done(null, updatedUser);
  } else {
    const newUser = await new User({ googleId, accessToken, refreshToken }).save();
    done(null, newUser);
  }
}));