const User = require('../model/customerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllCustomers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users: users },
  });
});

exports.getCustomer = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const users = await User.findById(id);

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users: users },
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};
