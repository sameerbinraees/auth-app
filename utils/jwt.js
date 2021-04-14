/* eslint-disable arrow-body-style */
/* eslint-disable no-else-return */
/* eslint-disable quote-props */
const jwt = require('jsonwebtoken');

const tokenService = {};

tokenService.signToken = (payload, exp) => {
  return jwt.sign(payload, process.env.JWT_SECRET, exp);
};

module.exports = tokenService;
