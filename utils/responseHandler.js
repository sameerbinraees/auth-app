const successHandler = (res, status, data) => {
  return res.status(status).json({
    statusCode: status,
    status: 'success',
    data,
  });
};

const errorHandler = (res, status, data) => {
  return res.status(status).json({
    statusCode: status,
    status: 'error',
    data,
  });
};

module.exports = {
  successHandler,
  errorHandler,
};
