const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { errorHandler } = require('../utils/responseHandler');
const User = require('../models/user');

const verifyToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return errorHandler(res, 401, 'Unauthorized');
    const token = authorization.replace('Bearer ', '');

    jwt.verify = promisify(jwt.verify);

    const userJWT = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userJWT.id).lean();

    if (user === null) { return errorHandler(res, 401, 'Unauthorized'); }

    req.user = user;
    return next();
  } catch (error) {
    return errorHandler(res, 500, error.message);
  }
};

module.exports = {
  verifyToken,
};
