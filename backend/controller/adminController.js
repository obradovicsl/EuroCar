const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Admin = require('../model/adminModel');
const Manager = require('../model/managerModel');
const Object = require('../model/objectModel');

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

exports.createManager = catchAsync( async (req, res, next) => {
  const manager = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    role: "manager",
    store: {},
  }

  const newManager = await Manager.create(manager);

  res.status(201).json({
    status: 'success',
    data: {
      newManager
    }
  });
});

exports.createObject = catchAsync( async (req, res, next) => {
  let manager = Manager.findById(req.body.managerId);

  if(!manager || manager.storeId != '')  return next(
    new AppError(
      'Manager does not exist or he is already a store owner',
      404
    )
  );

  const object = {
    name: req.body.name,
    workingHours: req.body.workingHours,
    locationId: req.body.locationId,
    logo: req.body.logo,
    managerId: req.body.managerId,
    vehiclesIds: [],
    rating: 0,
    open: false,
  }

  const newObject = await Object.create(object);
  
   manager = await Manager.findByIdAndUpdate(req.body.managerId, {
    storeId: newObject.id
  });

  res.status(201).json({
    status: 'success',
    data: {
      newObject
    }
  });
});


exports.deleteAdmin = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};
