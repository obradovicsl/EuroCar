const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../model/userModel');
const Vehicle = require('../model/vehicleModel');
const Initialize = require('../utils/initialize');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();

  const newUsers = new Array();

  for (let user of users) {
    user = await Initialize.initializeUsers(user);
    newUsers.push(user);
  }

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users: newUsers },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('Password update is not possible.', 400));
  }
  // 2) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body);

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.createManager = catchAsync(async (req, res, next) => {
  const manager = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    role: 'manager',
    storeId: '',
  };

  const newManager = await User.create(manager);

  res.status(201).json({
    status: 'success',
    data: {
      newManager,
    },
  });
});

exports.getAvailableManagers = catchAsync(async (req, res, next) => {
  const users = await User.findAll();
  const allManagers = users.filter((user) => user.role === 'manager');
  console.log(allManagers);

  const availableManagers = new Array();

  for (const manager of allManagers) {
    if (manager.storeId == '') availableManagers.push(manager);
  }

  res.status(200).json({
    status: 'success',
    results: availableManagers.length,
    data: { availableManagers: availableManagers },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body);

  if (!user) next(new AppError('No user found!', 404));

  res.status(201).json({ status: 'success', data: { user } });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, { active: true });

  if (!user) next(new AppError('No user found!', 404));

  res.status(204).json({
    status: 'success',
    user: null,
  });
});

exports.addToBasket = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.user.id);
  let basket = { vehicles: [], totalQuantity: 0, totalPrice: 0 };
  if (user.basket.totalQuantity == 0) {
    const vehicle = await Vehicle.findById(req.body.vehicleId);
    basket = initializeBasket(
      basket,
      vehicle,
      req.body.daysNum,
      user.customerType
    );
  } else {
    const vehicle = await Vehicle.findById(req.body.vehicleId);
    basket = addItemToBasket(
      user.basket,
      vehicle,
      user.customerType
    );
  }

  user = await User.findByIdAndUpdate(req.user.id, { basket: basket });

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

const initializeBasket = function (basket, vehicle, daysNum, customerType) {
  basket.vehicles.push({
    vehicle: vehicle,
    quantity: 1,
    price: vehicle.price * daysNum,
  });
  basket.totalQuantity++;
  basket.totalPrice = vehicle.price * daysNum;
  basket.daysNum = daysNum;
  if (customerType == 2)
    basket.discountedPrice = basket.totalPrice - basket.totalPrice * 0.05;
  if (customerType == 1)
    basket.discountedPrice = basket.totalPrice - basket.totalPrice * 0.1;
  return basket;
};

const addItemToBasket = function (basket, vehicle, customerType) {
  for (veh of basket.vehicles) {
    if (veh.vehicle.id == vehicle.id) {
      veh.quantity++;
      veh.price += veh.vehicle.price * basket.daysNum;
      basket.totalQuantity++;
      basket.totalPrice += veh.vehicle.price * basket.daysNum;
      console.log(basket.daysNum);
      if (customerType == 2)
        basket.discountedPrice = basket.totalPrice - basket.totalPrice * 0.05;
      if (customerType == 1)
        basket.discountedPrice = basket.totalPrice - basket.totalPrice * 0.1;
      return basket;
    }
  }

  basket.vehicles.push({
    vehicle: vehicle,
    quantity: 1,
    price: vehicle.price * basket.daysNum,
  });
  basket.totalQuantity++;
  basket.totalPrice += vehicle.price * basket.daysNum;
  return basket;
};

exports.getBasket = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  const basket = user.basket;

  if (!user) next(new AppError('No user found!', 404));

  res.status(200).json({
    status: 'success',
    data: {
      basket,
    },
  });
});
