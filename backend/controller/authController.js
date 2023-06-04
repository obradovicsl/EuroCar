const AppError = require('../utils/appError');
const Customer = require('./../model/customerModel');
const Admin = require('./../model/adminModel');
const Manager = require('./../model/managerModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true, //Cookiu ne moze pristupiti browser(ne moze ga ni menjati)
  };
  if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
}

exports.signup = catchAsync(async (req, res, next) => {
  const customer = {
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    role: "customer",
    rentals: [],
    basket: [],
    points: 0,
    customerType: 3
  }

  const newCustomer = await Customer.create(customer);

  createSendToken(newCustomer, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  //Provera da li je korisnik uneo username i sifru
  if (!username || !password) {
    return next(new AppError('Please provide username and password', 400));
  }

  //Provera da li su username i sifra validni
  const customer = await Customer.checkValidity({username, password});
  console.log(customer);
  if(customer){
    createSendToken(customer, 200, res);
  }

  const admin = await Admin.checkValidity({username, password});
  if(admin){
    createSendToken(admin, 200, res);
  }

  const manager = await Manager.checkValidity({username, password});
  if(manager){
    createSendToken(manager, 200, res);
  }

  if (!customer && !admin && !manager) {
    return next(new AppError('Incorrect username or password', 401));
  }
  //Kreiramo i saljemo web token
});

exports.protect = catchAsync(async (req, res, next) => {
  // Uzimamo token i proveravamo da li postoji
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    next(new AppError('You are not logged in!', 401));
  }

  // Verifikujemo token
  //decoded je payload polje tokena
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Proveravamo da li korisnik i dalje postoji
  const freshCustomer = await Customer.findById(decoded.id);
  if(freshCustomer)
  {
    //Dozvoljen pristup protected ruti
    req.customer = freshCustomer;
    next();
  }
  const freshAdmin = await Admin.findById(decoded.id);
  if(freshAdmin)
  {
    //Dozvoljen pristup protected ruti
    req.admin = freshAdmin;
    next();
  }

  const freshManager = await Manager.findById(decoded.id);
  if(freshManager)
  {
    //Dozvoljen pristup protected ruti
    req.manager = freshManager;
    next();
  }

  if (!freshCustomer && !freshAdmin && !freshManager) {
    return next(new AppError('The user does not no longer exist', 401));
  }
});


//Kasnije ce biti potrebno, kako bi zastitili endpointe za administratora/menadzera/kupca
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          'You do not have a permission to perform this action!',
          403
        )
      );
    }
    next();
  };
};
