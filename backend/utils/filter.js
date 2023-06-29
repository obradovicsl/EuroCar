exports.filterByName = function (objects, name) {
  objects = objects.filter((obj) => {
    return obj.name.toLowerCase().includes(name.toLowerCase());
  });
  return objects;
};

exports.filterByVehType = function (objects, vehicleType) {
  objects = objects.filter((obj) => {
    return obj.vehicles.find((vehicle) => vehicle.type == vehicleType);
  });
  return objects;
};

exports.filterByFuelType = function (objects, fuelType) {
  objects = objects.filter((obj) => {
    return obj.vehicles.find((vehicle) => {
     return vehicle.fuelType == fuelType
    });
  });
  return objects;
};

exports.filterByOpenState = function (objects) {
  objects = objects.filter((obj) => {
    return obj.open == true;
  });
  return objects;
};

exports.filterByAddress = function (objects, address) {
  objects = objects.filter((obj) => {
    return obj.location.address.toLowerCase().includes(address.toLowerCase());
  });
  return objects;
};

exports.filterByRating = function (objects, rating) {
  objects = objects.filter((obj) => {
    return obj.rating > rating;
  });
  return objects;
};


exports.filterByStore = function (rentals, storeName) {
  rentals = rentals.filter((ren) => {
    return ren.object.name.toLowerCase().includes(storeName.toLowerCase());
  });
  return rentals;
};

exports.filterByPrice = function (rentals, minPrice, maxPrice) {
  rentals = rentals.filter((ren) => {
    return (ren.price >= minPrice && ren.price <= maxPrice);
  });
  return rentals;
};

exports.filterByDate = function (rentals, startDate, endDate) {
  rentals = rentals.filter((ren) => {
    return (ren.startDate >= startDate && ren.endDate <= endDate);
  });
  return rentals;
};


exports.filterByFirstName = function (users, firstName) {
  users = users.filter((user) => {
    return user.firstName.toLowerCase().includes(firstName.toLowerCase());
  });
  return users;
};

exports.filterByLastName = function (users, lastName) {
  users = users.filter((user) => {
    return user.lastName.toLowerCase().includes(lastName.toLowerCase());
  });
  return users;
};

exports.filterByUsername = function (users, username) {
  users = users.filter((user) => {
    return user.username.toLowerCase().includes(username.toLowerCase());
  });
  return users;
};
exports.filterByRole = function (users, role) {
  users = users.filter((user) => {
    return user.role.toLowerCase().includes(role.toLowerCase());
  });
  return users;
};

exports.filterBySus = function (users, role) {
  users = users.filter((user) => {
    if(user.canceledRentals){
      return checkCancelArr(user.canceledRentals);
    }
  });
  return users;
};

const checkCancelArr = function(canceledRentals)
{
  let count = 0;
  let date = new Date();
  date = (date.getTime() - (30 * 24 * 60 * 60 * 1000));
  date = new Date(date);
  for(ren of canceledRentals)
  {
    let date1 = new Date(ren);
    if(date1 > date) count++;
  }
  if(count >= 5) return true;
  return false;
}
