const Rental = require('../model/rentalModel');
const Vehicle = require('../model/vehicleModel');
const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Initialize = require('../utils/initialize');

exports.getAllRentals = catchAsync(async (req, res, next) => {
  const rentals = await Rental.findAll();
  const newRentals = new Array();

  for (let rent of rentals) {
    rent = await Initialize.initializeRentals(rent);
    newRentals.push(rent);
  }

  res.status(200).json({
    status: 'success',
    results: newRentals.length,
    data: { rentals: newRentals },
  });
});

exports.getCustomersRentals = catchAsync(async (req, res, next) => {
  const allRentals = await Rental.findAll();
  const newRentals = new Array();

  const rentals = allRentals.filter((ren) => ren.customerId == req.user.id);

  for (let rent of rentals) {
    rent = await Initialize.initializeRentals(rent);
    newRentals.push(rent);
  }

  res.status(200).json({
    status: 'success',
    results: newRentals.length,
    data: { rentals: newRentals },
  });
});

exports.getManagersRentals = catchAsync(async (req, res, next) => {
  const allRentals = await Rental.findAll();
  const newRentals = new Array();

  const rentals = allRentals.filter((ren) => {
    return ren.rentalCompanyId == req.user.storeId;
  });

  for (let rent of rentals) {
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
  const customer = req.user;

  //Vehicles and companys
  let rentedVehicles = customer.basket.vehicles.map((veh) => veh.vehicle);

  const rentalCompanyId = rentedVehicles[0].rentCarObjectId;

  rentedVehicles = rentedVehicles.map((veh) => veh.id);

  // start and end date
  const startDate = new Date(req.body.startDate);
  console.log(startDate.getDate());
  const endDate = new Date(
    startDate.getTime() + req.body.rentedDays * 24 * 60 * 60 * 1000
  );

  const rental = {
    rentedVehiclesIds: rentedVehicles,
    rentalCompanyId: rentalCompanyId,
    startDate: startDate,
    endDate: endDate,
    rentalDuration: req.body.rentedDays,
    price: customer.basket.totalPrice,
    status: 'PROCESSING',
    customerId: req.user.id,
  };

  const user = await User.findById(req.user.id);

  // Add points
  const points = user.points + (rental.price / 1000) * 133;
  // Check if user get upgraded
  let customerType = 3;
  if (points > 1000) customerType = 2; //Popust 5%
  if (points > 5000) customerType = 1; //Popust 10%

  // Add new points, type, and reset basket
  const newUser = await User.findByIdAndUpdate(req.user.id, {
    points,
    customerType,
    basket: { vehicles: [], totalQuantity: 0, totalPrice: 0 },
  });

  const newRental = await Rental.create(rental);

  res.status(201).json({
    status: 'success',
    data: {
      newRental,
      newUser,
    },
  });
});

exports.cancelRental = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const rental = await Rental.findById(req.params.id);

  if (rental.customerId != user.id)
    return next(new AppError('User only can cancel their own rental!', 400));
  if (rental.status != 'PROCESSING')
    return next(new AppError('Only rentals in process can be canceled!', 400));

  const points = user.points - (rental.price / 1000) * 133 * 4;
  if (points < 0) points = 0;
  let customerType = 3;
  if (points > 1000) customerType = 2; //Popust 5%
  if (points > 5000) customerType = 1; //Popust 10%
  let canceledRentals = 1;
  if(user.canceledRentals) 
    canceledRentals = user.cancelRentals++;

  await User.findByIdAndUpdate(user.id, { points, customerType, canceledRentals });

  const newRental = await Rental.findByIdAndUpdate(req.params.id, {
    status: 'CANCELED',
  });

  res.status(200).json({
    status: 'success',
    data: {
      newRental,
    },
  });
});

exports.updateRentalStatus = catchAsync(async (req, res, next) => {
  const manager = await User.findById(req.user.id);
  const rental = await Rental.findById(req.params.id);
  const status = req.body.newStatus;

  if (rental.rentalCompanyId != manager.storeId)
    return next(new AppError('Unauthorized manager', 400));
  if (status == 'REJECTED' && !req.body.reason)
    return next(new AppError('You need to specify reason!', 400));


  let newRental = {};

  if (!isStateRespected(rental, status))
    return next(
      new AppError('That status update is not possible(visit help)', 400)
    );
console.log(newRental);
if (status.toUpperCase() == 'REJECTED')
newRental = await rejectRental(req.params.id, req.body.reason);

console.log(newRental);
  if (status.toUpperCase() == 'APPROVED')
    newRental = await approveRental(req.params.id);

  if (status.toUpperCase() == 'POSSESSED')
    newRental = await possessRental(req.params.id);

  if (status.toUpperCase() == 'RETURNED')
    newRental = await returnRental(req.params.id);

  res.status(200).json({
    status: 'success',
    data: { newRental },
  });
});

const isStateRespected = function (rental, newStatus) {
  if (
    rental.status == 'PROCESSING' &&
    (newStatus == 'POSSESSED' || newStatus == 'RETURNED')
  )
    return false;
  if (rental.status == 'APPROVED' && newStatus != 'POSSESSED') return false;
  if (rental.status == 'POSSESSED' && newStatus != 'RETURNED') return false;
  if (rental.status == 'REJECTED' || rental.status == 'CANCELED') return false;

  return true;
};

const rejectRental = async function (id, reason) {
  return await Rental.findByIdAndUpdate(id, {
    status: 'REJECTED',
    reason: reason,
  });
};
const approveRental = async function (id) {
  return await Rental.findByIdAndUpdate(id, {
    status: 'APPROVED',
  });
};

const possessRental = async function (id) {
  const rental = await Rental.findByIdAndUpdate(id, {
    status: 'POSSESSED',
  });
  const allVehicles = await Vehicle.findAll();

  const vehicles = allVehicles.filter((veh) => {
    return rental.rentedVehiclesIds.some((vehId) => veh.id == vehId);
  });

  console.log(vehicles);

  for (veh of vehicles) {
    await Vehicle.findByIdAndUpdate(veh.id, { available: false });
  }
  return rental;
};

const returnRental = async function (id) {
  const rental = await Rental.findByIdAndUpdate(id, {
    status: 'RETURNED',
  });
  const allVehicles = await Vehicle.findAll();

  const vehicles = allVehicles.filter((veh) => {
    return rental.rentedVehiclesIds.some((vehId) => veh.id == vehId);
  });

  console.log(vehicles);

  for (veh of vehicles) {
    await Vehicle.findByIdAndUpdate(veh.id, { available: true });
  }
  return rental;
};

const isValidManager = function (rental, manager) {
  for (store of rental.rentalCompanyIds) {
    if (store == manager.storeId) return true;
  }
  return false;
};
