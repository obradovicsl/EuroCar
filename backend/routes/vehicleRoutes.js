const express = require('express');
const vehicleController = require('../controller/vehicleController');
const router = express.Router();

router
  .route('/')
  .get(vehicleController.getAllVehicles)
  
router
  .route('/:id')
  .get(vehicleController.getVehicle)

module.exports = router;
