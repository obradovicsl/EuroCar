const Vehicle = require('../model/vehicleModel');
const Object = require('../model/objectModel');
const User = require('../model/userModel');
const Rental = require('../model/rentalModel');
const Review = require('../model/reviewModel');

exports.initializeRentals = async function (rental) {
  const newRental = { ...rental };

  const vehicles = new Array();
  for (const vehicleId of newRental.rentedVehiclesIds) {
    const vehicle = await Vehicle.findById(vehicleId);
    vehicle && vehicles.push(vehicle);
  }
  delete newRental.rentedVehiclesIds;
  newRental.vehicles = vehicles;

  const object = await Object.findById(newRental.rentalCompanyId);
  newRental.object = object;
  delete newRental.rentalCompanyId;

  return newRental;
};

exports.sortRentals = function (rentals) {
  rentals.sort((a, b) => {
    if (a.startDate > b.startDate) {
      return -1; // a ide prije b
    } else if (a.startDate < b.startDate) {
      return 1; // b ide prije a
    } else {
      return 0; // nema promjene u redoslijedu
    }
  });
  return rentals;
};

exports.initializeObject = async function (object) {
  try {
    const newObject = { ...object };

    const allVehicles = await Vehicle.findAll();
    const vehicles = new Array();

    //Populate vehicles
    for (const vehicle of allVehicles) {
      if (vehicle.rentCarObjectId == newObject.id && vehicle.active == true)
        vehicles.push(vehicle);
    }
    newObject.vehicles = vehicles;

    //Check if object is open

    const start = newObject.workingHours.from;
    var [hour, minut] = start.split(':');
    var startTime = new Date();
    startTime.setHours(parseInt(hour, 10));
    startTime.setMinutes(parseInt(minut, 10));

    const end = newObject.workingHours.to;
    var [hour, minut] = end.split(':');
    var endTime = new Date();
    endTime.setHours(parseInt(hour, 10));
    endTime.setMinutes(parseInt(minut, 10));

    const date = new Date();
    if (date > startTime && date < endTime) {
      newObject.open = true;
    } else {
      newObject.open = false;
    }

    const allReviews = await Review.findByObjectId(newObject.id);
    if (allReviews.length == 0) {
      newObject.rating = 4.5;
    } else {
      const sum = allReviews.reduce((sum, review) => {
        return sum + review.rating;
      }, 0);
      newObject.rating = sum / allReviews.length;
    }

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

exports.initializeReview = async function (review) {
  const newReview = { ...review };

  const allObjects = await Object.findAll();
  const allUsers = await User.findAll();

  for (const object of allObjects) {
    if (object.id == newReview.objectId) newReview.object = object;
  }
  delete newReview.objectId;
  for (const user of allUsers) {
    if (user.id == newReview.userId) newReview.user = user;
  }
  delete newReview.userId;

  return newReview;
};
