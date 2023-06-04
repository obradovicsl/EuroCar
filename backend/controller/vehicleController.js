const Vehicle = require('../model/vehicleModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllVehicles = catchAsync(async (req, res, next) => {
  const vehicles = await Vehicle.findAll();

  res.status(200).json({
    status: 'success',
    results: vehicles.length,
    data: { vehicles: vehicles },
  });
});

exports.getVehicle = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const vehicles = await Vehicle.findById(id);

  res.status(200).json({
    status: 'success',
    results: vehicles.length,
    data: { vehicles: vehicles },
  });
});

exports.createVehicle = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};

exports.updateVehicle = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};

exports.deleteVehicle = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};
