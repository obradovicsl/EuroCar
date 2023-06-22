const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../model/userModel');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users: users },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('Password update is not possible.', 400));
  }
  // 2) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body);

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.createManager = catchAsync(async (req, res, next) => {
  const manager = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    role: 'manager',
    storeId: '',
  };

  const newManager = await User.create(manager);

  res.status(201).json({
    status: 'success',
    data: {
      newManager,
    },
  });
});

exports.getAvailableManagers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();
  const allManagers = users.map((user) => user.role === 'manager');

  const availableManagers = new Array();

  for (const manager of allManagers) {
    if (manager.storeId == '') availableManagers.push(manager);
  }

  res.status(200).json({
    status: 'success',
    results: availableManagers.length,
    data: { availableManagers: availableManagers },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);

  if (!user) next(new AppError('No user found!', 404));

  res.status(201).json({ status: 'success', data: { user } });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, { active: true });

  if (!user) next(new AppError('No user found!', 404));

  res.status(204).json({
    status: 'success',
    user: null,
  });
});
