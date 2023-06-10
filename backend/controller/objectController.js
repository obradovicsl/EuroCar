const Object = require('../model/objectModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllObjects = catchAsync(async (req, res, next) => {
  const objects = await Object.findAll();

  res.status(200).json({
    status: 'success',
    results: objects.length,
    data: { objects: objects },
  });
});

exports.getObject = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const objects = await Object.findById(id);

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
