const Object = require('../model/objectModel');
const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Initialize = require('../utils/initialize');
const Filter = require('../utils/filter');

exports.getAllObjects = catchAsync(async (req, res, next) => {
  const objects = await Object.findAll();

  const newObjects = new Array();

  for (let obj of objects) {
    obj = await Initialize.initializeObject(obj);
    newObjects.push(obj);
  }

  res.status(200).json({
    status: 'success',
    results: objects.length,
    data: { objects: newObjects },
  });
});

exports.getObject = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  let object = await Object.findById(id);

  object = await Initialize.initializeObject(object);

  res.status(200).json({
    status: 'success',
    results: object.length,
    data: { object },
  });
});

exports.findObject = catchAsync(async (req, res, next) => {
  const o = await Object.findAll();
  let objects = new Array();

  for (let obj of o) {
    obj = await Initialize.initializeObject(obj);
    objects.push(obj);
  }

  const name = req.query.name;
  const vehicleType = req.query.vehicleType;
  const address = req.query.address;
  const rating = req.query.rating;

  if (name != '') objects = Filter.filterByName(objects, name);
  if (vehicleType != '') objects = Filter.filterByVehType(objects, vehicleType);
  if (address != '') objects = Filter.filterByAddress(objects, address);
  if (rating > 0) objects = Filter.filterByRating(objects, rating);

  res.status(200).json({
    status: 'success',
    results: objects.length,
    data: { objects: objects },
  });
});

exports.filterObjects = catchAsync(async (req, res, next) => {
  const o = await Object.findAll();
  let objects = new Array();

  for (let obj of o) {
    obj = await Initialize.initializeObject(obj);
    objects.push(obj);
  }

  const fuelType = req.query.fuelType;
  const type = req.query.type;
  const isOpen = req.query.open;

  if (fuelType && fuelType != 'None') objects = Filter.filterByFuelType(objects, fuelType);
  if (type && type != 'None') objects = Filter.filterByVehType(objects, type);
  if (isOpen && isOpen != 'False') objects = Filter.filterByOpenState(objects);

  res.status(200).json({
    status: 'success',
    results: objects.length,
    data: { objects: objects },
  });
});

exports.createObject = catchAsync(async (req, res, next) => {
  let manager = await User.findById(req.body.managerId);

  if (!manager || manager.storeId != '' || manager.role != 'manager')
    return next(
      new AppError('Manager does not exist or he is already a store owner', 404)
    );

  const object = {
    name: req.body.name,
    workingHours: req.body.workingHours,
    location: req.body.location,
    logo: req.body.logo,
    managerId: req.body.managerId,
    vehiclesIds: [],
    rating: 0,
    open: false,
  };

  const newObject = await Object.create(object);

  manager = await User.findByIdAndUpdate(req.body.managerId, {
    storeId: newObject.id,
  });

  res.status(201).json({
    status: 'success',
    data: {
      newObject,
    },
  });
});

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
