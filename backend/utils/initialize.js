const Vehicle = require('../model/vehicleModel');
const Object = require('../model/objectModel');
const Rental = require('../model/rentalModel');

exports.initializeRentals = async function (rental) {
  const newRental = { ...rental };
  const vehicles = new Array();
  for (const vehicleId of newRental.rentedVehiclesIds) {
    const vehicle = await Vehicle.findById(vehicleId);
    vehicle && vehicles.push(`${vehicle.brand} ${vehicle.model}`);
  }
  delete newRental.rentedVehiclesIds;
  newRental.vehicles = vehicles;

  const object = await Object.findById(newRental.rentalCompanyId);
  newRental.object = object?.name;
  delete newRental.rentalCompanyId;

  return newRental;
};

exports.initializeObject = async function (object) {
  try {
    const newObject = { ...object };

    const allVehicles = await Vehicle.findAll();

    const vehicles = new Array();

    for (const vehicle of allVehicles) {
      if (vehicle.rentCarObjectId == newObject.id) vehicles.push(vehicle);
    }
    newObject.vehicles = vehicles;

    return newObject;
  } catch (err) {
    console.log(err);
  }
};

exports.initializeUsers = async function (user) {
  const newUser = { ...user };

  const allRentals = await Rental.findAll();

  const rentals = new Array();

  for (const rental of allRentals) {
    if (rental.customerId == newUser.id) rentals.push(rental);
  }

  newUser.rentals = rentals;

  return newUser;
};
