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

  router.route('/:id').get(objectController.getObject);

router.use(authController.protect);
router.use(authController.restrictTo('manager', 'admin'));

router.route('/search').get(objectController.findObject);



module.exports = router;
