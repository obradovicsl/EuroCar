const express = require('express');
const userController = require('../controller/userController');
const authController = require('./../controller/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protect all routes after this middleware
router.use(authController.protect);

router.post('/basket',authController.restrictTo('customer'), userController.addToBasket);
router.delete('/basket',authController.restrictTo('customer'), userController.removeFromBasket);

router.get('/basket', authController.restrictTo('customer'), userController.getBasket);


router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);
router.get('/me', userController.getMe, userController.getUser);

// Restrict to admin all routes after this middleware
router.use(authController.restrictTo('admin'));


router.get('/search',userController.searchUsers);
router.get('/filter',userController.filterUsers);
router.get('/availableManagers', userController.getAvailableManagers);
router.post('/createManager', userController.createManager);
router.patch('/block/:id', userController.blockUser);
router.patch('/unblock/:id', userController.unblockUser);

router
  .route('/')
  .get(userController.getAllUsers)
  
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
