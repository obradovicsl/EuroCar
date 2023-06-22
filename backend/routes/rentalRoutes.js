const express = require('express');
const rentalController = require('../controller/rentalController');
const authController = require('./../controller/authController');
const router = express.Router();


router
  .route('/')
  .get(rentalController.getAllRentals)
  .post(authController.protect, authController.restrictTo('customer'), rentalController.createRental);
  
router
  .route('/:id')
  .get(rentalController.getRental)
  .patch(rentalController.updateRental);
  
module.exports = router;
