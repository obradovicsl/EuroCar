const Vehicle = require('../model/vehicleModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllVehicles = catchAsync(async (req, res, next) => {
  const vehicles = await Vehicle.findAll();

  res.status(200).json({
    status: 'success',
    results: vehicles.length,
    data: { vehicles },
  });
});

exports.getVehicle = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const vehicle = await Vehicle.findById(id);

  if(!vehicle) return next(new AppError('There is no vehicle with that id!', 404));

  res.status(200).json({
    status: 'success',
    data: { vehicle },
  });
});

exports.createVehicle = catchAsync(async (req, res, next) => {
  const vehicle = {
    brand: req.body.brand,
    model: req.body.model,
    price: req.body.price,
    type: req.body.type,
    rentCarObjectId: req.user.storeId,
    transmission: req.body.transmission,
    fuelType: req.body.fuelType,
    consumption: req.body.consumption,
    doors: req.body.doors,
    capacity: req.body.capacity,
    description: req.body.description,
    image: req.body.image,
    available: true,
  };

  const newVehicle = await Vehicle.create(vehicle);

  res.status(201).json({
    status: 'success',
    data: {
      newVehicle,
    },
  });
});

exports.updateVehicle = catchAsync(async (req, res, next) => {
  const vehicleId = req.params.id;
  const vehicle = { ...req.body };
  const newVehicle = await Vehicle.findByIdAndUpdate(vehicleId, vehicle);

  res.status(201).json({
    status: 'success',
    data: {
      newVehicle,
    },
  });
});

exports.deleteVehicle = catchAsync(async (req, res, next) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) return next(new AppError('Vehicle does not exist!', 404));

  await Vehicle.remove(req.params.id);

  res.status(202).json({
    status: 'success',
  });
});
