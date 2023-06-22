const Rental = require('../model/rentalModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Initialize = require('../utils/initialize');

exports.getAllRentals = catchAsync(async (req, res, next) => {
  const rentals = await Rental.findAll();
  const newRentals = new Array();

  for(let rent of rentals){ 
    rent = await Initialize.initializeRentals(rent);
    newRentals.push(rent);
  }

  res.status(200).json({
    status: 'success',
    results: newRentals.length,
    data: { rentals: newRentals },
  });
});

exports.getRental = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const rental = await Rental.findById(id);

  if (!rental)
    return next(new AppError('There is no rental with that id!', 404));

  res.status(200).json({
    status: 'success',
    data: { rental },
  });
});

exports.createRental = catchAsync(async (req, res, next) => {
  const rental = {
    rentedVehiclesIds: [...req.body.vehiclesIds],
    rentalCompanyId: req.body.companyId,
    rentalDateTime: req.body.dateTime,
    rentalDuration: req.body.duration,
    price: req.body.price,
    status: 'PROCESSING',
    customerId: req.user.id,
  };

  const newRental = await Rental.create(rental);

  res.status(201).json({
    status: 'success',
    data: {
      newRental,
    },
  });
});

exports.updateRental = catchAsync(async (req, res, next) => {
  const rentalId = req.params.id;

  const rental = { ...req.body };
  const newRental = await Rental.findByIdAndUpdate(rentalId, rental);

  res.status(201).json({
    status: 'success',
    data: {
      newRental,
    },
  });
});
    