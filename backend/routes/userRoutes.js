const express = require('express');
const userController = require('../controller/userController');
const authController = require('./../controller/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protect all routes after this middleware
router.use(authController.protect);

router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);
router.get('/me', userController.getMe, userController.getUser);

// Restrict to admin all routes after this middleware
router.use(authController.restrictTo('admin'));

router.get('/availableManagers', userController.getAvailableManagers);

router
  .route('/')
  .get(userController.getAllUsers)
  
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
