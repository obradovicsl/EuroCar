const AppError = require('../utils/appError');
const Customer = require('./../model/customerModel');
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

  console.log("eee");
  //Provera da li su username i sifra validni
  const user = await Customer.checkValidity({username, password});
  console.log("eee");

  if (!user) {
    return next(new AppError('Incorrect username or password', 401));
  }

  //Kreiramo i saljemo web token
  createSendToken(user, 200, res);
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
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError('The user does not no longer exist', 401));
  }

  //Dozvoljen pristup protected ruti
  req.user = freshUser;
  next();
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
