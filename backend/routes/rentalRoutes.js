const express = require('express');
const rentalController = require('../controller/rentalController');
const authController = require('./../controller/authController');
const router = express.Router();


router.use(authController.protect);

router
  .route('/')
  .get(rentalController.getAllRentals)
  .post(authController.restrictTo('customer'), rentalController.createRental);
  
router
  .route('/cancel/:id')
  .patch(authController.restrictTo('customer'), rentalController.cancelRental);

router
  .route('/:id')
  .patch(authController.restrictTo('manager'), rentalController.updateRentalStatus);

router
  .route('/customers')
  .get(authController.restrictTo('customer'), rentalController.getCustomersRentals);

router
  .route('/managers')
  .get(authController.restrictTo('manager'), rentalController.getManagersRentals);
  
module.exports = router;
