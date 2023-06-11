const Object = require('../model/objectModel');
const Location = require('../model/locationModel');
const Vehicle = require('../model/vehicleModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Initialize = require('../utils/initialize');
const Filter = require('../utils/filter');

exports.getAllObjects = catchAsync(async (req, res, next) => {
  const objects = await Object.findAll();
  const newObjects = new Array();

  for(let obj of objects){ 
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

  for(let obj of o){ 
    obj = await Initialize.initializeObject(obj);
    objects.push(obj);
  }

  const name = req.query.name;
  const vehicleType = req.query.vehicleType;
  const address = req.query.address;
  const rating = req.query.rating;

  if(name) objects = Filter.filterByName(objects, name);
  if(vehicleType) objects = Filter.filterByVehType(objects,vehicleType);
  if(address) objects = Filter.filterByAddress(objects, address);
  if(rating) objects = Filter.filterByRating(objects, rating);

  res.status(200).json({
    status: 'success',
    results: objects.length,
    data: { objects: objects },
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