const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const { v4: uuidv4 } = require('uuid');

const { successHandler, errorHandler } = require('../utils/responseHandler');
const { sendEmail } = require('../utils/sendEmail');
const User = require('../models/user');
const jwt = require('../utils/jwt');

const generateOTP = () => {
  return otpGenerator.generate(6, { upperCase: false, specialChars: false });
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user) {
      return errorHandler(res, 404, 'User not found');
    }
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      return errorHandler(res, 404, 'Email or password is incorrect');
    }

    const token = jwt.signToken({
      id: user._id,
      email,
    });
    delete user.password;
    user.token = token;
    const data = {
      ...user,
    };
    return successHandler(res, 200, data);
  } catch (error) {
    return errorHandler(res, 400, error.message);
  }
};

const Register = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const otp = generateOTP();
    const user = new User({
      uuid: uuidv4(),
      ...req.body,
      emailVerificationCode: otp,
      emailVerificationExpiry: Date.now() + 1800000, // valid for half hour
    });
    const { _doc: newUser } = await user.save();
    delete newUser.password;
    // const token = jwt.signToken({        //! Commented bcs we have to reroute user to login page
    //     id: newUser._id,
    //     email: newUser.email
    // });
    // newUser.token = token;
    const data = {
      ...newUser,
    };
    return successHandler(res, 201, data);
  } catch (error) {
    if (error.keyPattern.email)
      return errorHandler(res, 400, 'Email already in use');
    return errorHandler(res, 400, error);
  }
};

const ResetPasswordEmail = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      ...req.body,
    });

    const { _doc: newUser } = await user.save();
    delete newUser.password;
    // const token = jwt.signToken({        //! Commented bcs we have to reroute user to login page
    //     id: newUser._id,
    //     email: newUser.email
    // });
    // newUser.token = token;
    const data = {
      ...newUser,
    };
    return successHandler(res, 201, data);
  } catch (error) {
    return errorHandler(res, 400, error);
  }
};

const ResetPassword = async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      ...req.body,
    });

    const { _doc: newUser } = await user.save();
    delete newUser.password;
    // const token = jwt.signToken({        //! Commented bcs we have to reroute user to login page
    //     id: newUser._id,
    //     email: newUser.email
    // });
    // newUser.token = token;
    const data = {
      ...newUser,
    };
    return successHandler(res, 201, data);
  } catch (error) {
    return errorHandler(res, 400, error);
  }
};

module.exports = {
  Login,
  Register,
};
