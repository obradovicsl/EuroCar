const express = require('express');
const customerController = require('../controller/customerController');
 const authController = require('./../controller/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.patch('/updateMe', authController.protect, customerController.updateMe);
// router.delete('/deleteMe', authController.protect, customerController.deleteMe);

router
  .route('/')
  .get(customerController.getAllCustomers);
  
router
  .route('/:id')
  .get(customerController.getCustomer)

module.exports = router;
