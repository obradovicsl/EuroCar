const Customer = require('../model/customerModel');
const Rental = require('../model/rentalModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllCustomers = catchAsync(async (req, res, next) => {
  const customers = await Customer.findAll();

  res.status(200).json({
    status: 'success',
    results: customers.length,
    data: { customers: customers },
  });
});

exports.getCustomer = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const customer = await Customer.findById(id);

  const rentals = new Array();
  for(const rentId of customer.rentalsIds){
    const rental = await Rental.findById(rentId);
    rental && rentals.push(rental);
  }
  
  delete customer.rentalsIds;
  customer.rentals = rentals;

  res.status(200).json({
    status: 'success',
    results: customer?.length,
    data: { customer: customer },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  // 2) Update user document
  const updatedCustomer = await Customer.findByIdAndUpdate(req.customer.id, req.body);

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedCustomer
    }
  });
});

exports.deleteCustomer = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not yet defined!',
  });
};
