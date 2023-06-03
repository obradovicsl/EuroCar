const AppError = require('../utils/appError');


const handleJWTError = (err) =>
  new AppError('Invalid token, please log in again', 401);
  
const handleJWTExpiredError = (err) =>
  new AppError('Your token has expired! Please log in again', 401);

const sendErrorOperational = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err: err,
  });
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error(`ERROR: 💥${err}`);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV == 'development') {
    sendErrorOperational(err, res);
  } else if (process.env.NODE_ENV == 'production') {
    let error = { ...err };

    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError(error);

    sendErrorProd(error, res);
  }
};
