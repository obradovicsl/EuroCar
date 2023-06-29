const Vehicle = require('../model/vehicleModel');
const Rental = require('../model/rentalModel');
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

  if (!vehicle)
    return next(new AppError('There is no vehicle with that id!', 404));

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
    active: true,
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
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, { active: false });
  if (!vehicle) next(new AppError('No vehicle found!', 404));

  res.status(202).json({
    status: 'success',
  });
});

exports.getAvailableVehicles = catchAsync(async (req, res, next) => {
  const startDate = new Date(req.query.start);
  const endDate = new Date(req.query.end);

  let rentals = await Rental.findAll();
  let allVehicles = await Vehicle.findAll();

  let unavailableVehicles = new Set();
  rentals = rentals.filter(rental => (rental.status !='RETURNED' && rental.status != 'REJECTED' && rental.status != 'CANCELED'))

  
  for (ren of rentals) {
    let renStartDate = new Date(ren.startDate);
    let renEndDate = new Date(ren.endDate);
    
    if (
      (renStartDate >= startDate && renStartDate <= endDate) ||
      (renEndDate >= startDate && renEndDate <= endDate)
    ) {
      for (veh of ren.rentedVehiclesIds) {
        unavailableVehicles.add(veh);
      }
    }
  }

  unavailableVehicles = [...unavailableVehicles];

  const availableVehicles = allVehicles.filter(
    (veh) =>
      !unavailableVehicles.some((unavailableVeh) => unavailableVeh == veh.id)
  );

  res.status(200).json({
    status: 'success',
    results: availableVehicles.length,
    data: { availableVehicles },
  });
});
