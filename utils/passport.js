/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');

// const { successHandler, errorHandler } = require('./responseHandler');

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
module.exports = function () {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(profile);
          const user = await User.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
          } else {
            const googleUser = new User({
              uuid: uuidv4(),
              googleId: profile.id,
              email: profile.emails[0].value,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              googleLogin: true,
              image: profile.photos[0].value,
            });
            const { _doc: newUser } = await googleUser.save();
            const data = {
              ...newUser,
            };
            done(null, data);
          }
        } catch (error) {
          console.log(error);
        }
      },
    ),
  );

  passport.use(
    new LinkedInStrategy(
      {
        clientID: '77owdq3jp155zq',
        clientSecret: 'QIdrdgITstCtOYl6',
        callbackURL: 'http://localhost:8080/api/auth/linkedin/callback',
      },
      function (token, tokenSecret, profile, done) {
        console.log(profile);
        // User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
        //   return done(err, user);
        // });
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      return done(err, user);
    });
  });
};
