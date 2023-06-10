const express = require('express');
const adminController = require('../controller/adminController');
 const authController = require('./../controller/authController');
const router = express.Router();

router.post('/login', authController.login);

router.patch('/updateMe', authController.protect, adminController.updateMe);

router.post('/createManager', authController.protect, authController.restrictTo('admin'), adminController.createManager);

router.post('/createObject', authController.protect, authController.restrictTo('admin'), adminController.createObject);

// router.delete('/deleteMe', authController.protect, adminController.deleteMe);

router
  .route('/')
  .get(adminController.getAllAdmins)
  
router
  .route('/:id')
  .get(adminController.getAdmin)

module.exports = router;
