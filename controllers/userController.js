const User = require('../models/user');
const { successHandler, errorHandler } = require('../utils/responseHandler');

const confirmEmail = async (req, res) => {
  try {
    const verifiedUser = await User.findOneAndUpdate(
      {
        email: req.body.email,
        emailVerificationCode: req.body.emailVerificationCode,
        emailVerificationExpiry: { $gte: Date.now() },
      },
      {
        emailVerified: true,
        emailVerificationCode: null,
        emailVerificationExpiry: null,
      },
      { new: true },
    );
    if (verifiedUser === null) {
      return errorHandler(res, 404, 'Email verification failed');
    }
    return successHandler(res, 200, 'Email successfully verified');
  } catch (error) {
    return errorHandler(res, 500, error);
  }
};
const changePassword = (req, res) => {
  console.log(req.body);
  return successHandler(res, 200, null);
};

const enableMFA = (req, res) => {
  console.log(req.body);
  return successHandler(res, 200, null);
};

const disableMFA = (req, res) => {
  console.log(req.body);
  return successHandler(res, 200, null);
};

module.exports = {
  confirmEmail,
  changePassword,
  enableMFA,
  disableMFA,
};
