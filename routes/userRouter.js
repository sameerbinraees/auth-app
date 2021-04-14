const express = require('express');

const router = express.Router();
const {
  confirmEmail,
  enableMFA,
  disableMFA,
  changePassword,
} = require('../controllers/userController');


router.post('/verify-email', confirmEmail);

// update password for authenticated user
router.post('/changeUserPassword', changePassword);

// enable mfa
router.post('/enableMFA', enableMFA);

// disable mfa
router.post('/disableMFA', disableMFA);

module.exports = router;
