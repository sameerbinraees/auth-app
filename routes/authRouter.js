const express = require('express');
const passport = require('passport');

const router = express.Router();
const { Login, Register } = require('../controllers/authController');

/* Verify entered credentials from DB and return a JWT Token along with user details
and verification status IF MFA IS DISABLED
 Else will send an otp code to email and return and mfa challenge */

/**
 * @param email
 * @param code
 * @param password
 */

router.post('/login', Login);

// @Params: firstName, lastName, DOB, email, password
/* This api will create a DB entry for the user with the provided data and an additional
flag of verified=false. An email will be sent to the user to confirm their account */
// router.post('/register', (req, res) => {
//   console.log(req.body);
//   res.json({ message: 'success' });
// });

router.post('/register', Register);

// Params: TO BE DISCUSSED
// This api will confirm a users account by setting verified status to true
router.post('/verifyAccount', (req, res) => {
  console.log(req.body);
  res.json({ message: 'success' });
});

// Params: email
// This api will send an OTP to provided email
router.post('/sendOtpEmail', (req, res) => {
  console.log(req.body);
  res.json({ message: 'success' });
});

// @Params: email, code, password
// Verify the entered otp(validity and within expiry time) and reset new password across given email
router.post('/resetPassword', (req, res) => {
  console.log(req.body);
  res.json({ message: 'success' });
});

// @Params: token
// Verify token and reset password across given email
router.post('/changeUserPassword', (req, res) => {
  console.log(req.body);
  res.json({ message: 'success' });
});

// @Params: token
// Verify token and enable MFA across given email
router.post('/enableMFA', (req, res) => {
  console.log(req.body);
  res.json({ message: 'success' });
});

// @Params: token
// Verify token and disable MFA across given email
router.post('/disableMFA', (req, res) => {
  console.log(req.body);
  res.json({ message: 'success' });
});

router.get(
  '/linkedin',
  passport.authenticate('linkedin', {
    scope: ['r_basicprofile', 'r_emailaddress'],
  }),
);
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // console.log(req);
    res.status(200).json({
      statusCode: 200,
      status: 'success',
      data: req.user,
    });
  },
);
router.get(
  '/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  (req, res) => {
    // console.log(req);
    res.status(200).json({
      statusCode: 200,
      status: 'success',
      data: req.user,
    });
  },
);

/** *****************************************   FUTURE APIS   ****************************************** */

/**
 * Sign in with google
 * Sign in with facebook
 * Register with google
 * Register with facebook
 *  */

module.exports = router;
