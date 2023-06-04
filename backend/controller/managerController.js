const Manager = require('../model/managerModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllManagers = catchAsync(async (req, res, next) => {
  const managers = await Manager.findAll();

  res.status(200).json({
    status: 'success',
    results: managers.length,
    data: { managers: managers },
  });
});

exports.getManager = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const managers = await Manager.findById(id);

  res.status(200).json({
    status: 'success',
    results: managers?.length,
    data: { managers: managers },
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
  console.log("TEST 1");
  // 2) Update user document
  const updatedManager = await Manager.findByIdAndUpdate(req.manager.id, req.body);
  
  console.log("TEST 2");
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedManager
    }
  });
});

exports.createManager = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};

exports.updateManager = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};

exports.deleteManager = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};
