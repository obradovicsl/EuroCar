const express = require('express');
const objectController = require('../controller/objectController');
const router = express.Router();

router
  .route('/search')
  .get(objectController.findObject);


  router
  .route('/')
  .get(objectController.getAllObjects);
  
router
  .route('/:id')
  .get(objectController.getObject);

module.exports = router;
