const express = require('express');
const adminController = require('../controller/adminController');
 const authController = require('./../controller/authController');
const router = express.Router();

router.post('/login', authController.login);

router.patch('/updateMe', authController.protect, adminController.updateMe);
// router.delete('/deleteMe', authController.protect, adminController.deleteMe);

router
  .route('/')
  .get(adminController.getAllAdmins)
  .post(adminController.createAdmin);
  
router
  .route('/:id')
  .get(adminController.getAdmin)
  .patch(adminController.updateAdmin)
  .delete(adminController.deleteAdmin);

module.exports = router;
