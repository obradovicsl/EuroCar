const express = require('express');
const managerController = require('../controller/managerController');
 const authController = require('./../controller/authController');
const router = express.Router();

router.post('/login', authController.login);

router.post('/createVehicle', authController.protect, authController.restrictTo('manager'), managerController.createVehicle);

router.patch('/updateVehicle', authController.protect, authController.restrictTo('manager'), managerController.updateVehicle);

router.delete('/:id', authController.protect, authController.restrictTo('manager'), managerController.deleteVehicle);

router.patch('/updateMe', authController.protect, managerController.updateMe);

router.get('/available', authController.protect, managerController.getAvailableManagers);

// router.delete('/deleteMe', authController.protect, managerController.deleteMe);

router
  .route('/')
  .get(managerController.getAllManagers)
  
router
  .route('/:id')
  .get(managerController.getManager)

module.exports = router;
