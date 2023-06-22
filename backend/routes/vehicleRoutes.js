const express = require('express');
const vehicleController = require('../controller/vehicleController');
const authController = require('./../controller/authController');
const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo('manager'));

router
  .route('/')
  .get(vehicleController.getAllVehicles)
  .post(vehicleController.createVehicle);
  
router
  .route('/:id')
  .get(vehicleController.getVehicle)
  .delete(vehicleController.deleteVehicle)
  .patch(vehicleController.updateVehicle);
module.exports = router;
