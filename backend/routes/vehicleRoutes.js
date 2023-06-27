const express = require('express');
const vehicleController = require('../controller/vehicleController');
const authController = require('./../controller/authController');
const router = express.Router();

router.use(authController.protect);

router.route('/available').get(vehicleController.getAvailableVehicles);

router
  .route('/')
  .get(vehicleController.getAllVehicles)
  .post(authController.restrictTo('manager'), vehicleController.createVehicle);
  
router
  .route('/:id')
  .get(vehicleController.getVehicle)
  .delete(vehicleController.deleteVehicle)
  .patch(vehicleController.updateVehicle);
module.exports = router;
