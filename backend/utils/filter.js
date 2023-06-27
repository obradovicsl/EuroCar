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
