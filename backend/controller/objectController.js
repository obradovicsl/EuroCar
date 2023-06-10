const Object = require('../model/objectModel');
const Location = require('../model/locationModel');
const Vehicle = require('../model/vehicleModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllObjects = catchAsync(async (req, res, next) => {
  const objects = await Object.findAll();

  for(let obj of objects){ 
    const location = await Location.findById(obj.locationId);
    obj.address = location.address;
    delete obj.locationId;
  }

  res.status(200).json({
    status: 'success',
    results: objects.length,
    data: { objects: objects },
  });
});

exports.getObject = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const object = await Object.findById(id);

  const location = await Location.findById(object.locationId);
  object.address = location?.address;
  delete object.locationId;
  const vehicles = new Array();
  for(const vehId of object.vehiclesIds){
    const vehicle = await Vehicle.findById(vehId);
    vehicle && vehicles.push(vehicle);
  }
  delete object.vehiclesIds;
  object.vehicles = vehicles;

  res.status(200).json({
    status: 'success',
    results: object.length,
    data: { object: object },
  });
});

exports.createObject = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};

exports.updateObject = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};

exports.deleteObject = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};
