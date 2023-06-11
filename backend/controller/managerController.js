const Manager = require('../model/managerModel');
const Object = require('../model/objectModel');
const Vehicle = require('../model/vehicleModel');
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
  // 2) Update user document
  const updatedManager = await Manager.findByIdAndUpdate(
    req.manager.id,
    req.body
  );

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedManager,
    },
  });
});

exports.getAvailableManagers = catchAsync(async (req, res, next) => {
  const allManagers = await Manager.findAll();
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

exports.createVehicle = catchAsync(async (req, res, next) => {
  const vehicle = {
    brand: req.body.brand,
    model: req.body.model,
    price: req.body.price,
    type: req.body.type,
    rentCarObjectId: req.manager.storeId,
    transmission: req.body.transmission,
    fuel_type: req.body.fuel_type,
    consumption: req.body.consumption,
    doors: req.body.doors,
    capacity: req.body.capacity,
    description: req.body.description,
    image: req.body.image,
    available: true,
  };

  const newVehicle = await Vehicle.create(vehicle);
  let object = await Object.findById(newVehicle.rentCarObjectId);

  object = await Object.findByIdAndUpdate(newVehicle.rentCarObjectId, {
    vehiclesIds: [...object.vehiclesIds, newVehicle.id],
  });

  res.status(201).json({
    status: 'success',
    data: {
      newVehicle,
      object,
    },
  });
});

exports.updateVehicle = catchAsync(async (req, res, next) => {
  const vehicle = { ...req.body };
  const newVehicle = await Vehicle.findByIdAndUpdate(vehicle.id, vehicle);

  res.status(201).json({
    status: 'success',
    data: {
      newVehicle,
    },
  });
});

exports.deleteVehicle = catchAsync(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if(!vehicle) return next(new AppError('Vehicle does not exist!', 404));
  console.log(vehicle);
  if(vehicle.rentCarObjectId != ""){
    await Object.removeVehicle(vehicle.rentCarObjectId, req.params.id);
  }

    await Vehicle.remove(req.params.id);

  res.status(202).json({
    status: 'success',
  });
});

exports.deleteManager = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};
