const express = require('express');
const managerController = require('../controller/managerController');
 const authController = require('./../controller/authController');
const router = express.Router();

router.post('/login', authController.login);

router.patch('/updateMe', authController.protect, managerController.updateMe);
// router.delete('/deleteMe', authController.protect, managerController.deleteMe);

router
  .route('/')
  .get(managerController.getAllManagers)
  .post(managerController.createManager);
  
router
  .route('/:id')
  .get(managerController.getManager)
  .patch(managerController.updateManager)
  .delete(managerController.deleteManager);

module.exports = router;
