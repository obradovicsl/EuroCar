const Admin = require('../model/adminModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllAdmins = catchAsync(async (req, res, next) => {
  const admins = await Admin.findAll();

  res.status(200).json({
    status: 'success',
    results: admins.length,
    data: { admins: admins },
  });
});

exports.getAdmin = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const admins = await Admin.findById(id);

  res.status(200).json({
    status: 'success',
    results: admins?.length,
    data: { admins: admins },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  // 2) Update user document
  const updatedAdmin = await Admin.findByIdAndUpdate(req.admin.id, req.body);

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedAdmin
    }
  });
});

exports.createAdmin = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};

exports.updateAdmin = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};

exports.deleteAdmin = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};
