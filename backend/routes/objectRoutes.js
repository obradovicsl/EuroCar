const express = require('express');
const objectController = require('../controller/objectController');
const authController = require('./../controller/authController');
const router = express.Router();

router
  .route('/')
  .get(objectController.getAllObjects)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    objectController.createObject
  );

router.use(authController.protect);
router.use(authController.restrictTo('manager', 'admin'));

router.route('/search').get(objectController.findObject);

router.route('/:id').get(objectController.getObject);

module.exports = router;
