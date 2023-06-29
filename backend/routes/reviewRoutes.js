const express = require('express');
const reviewController = require('../controller/reviewController');
const authController = require('../controller/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.restrictTo('customer'),
    reviewController.createReview
  );

  router
  .route('/forUsers')
  .get(reviewController.getAllReviewsForUser);

router.route('/canRate').get(reviewController.canUserRate);

router
  .route('/:id')
  .patch(authController.restrictTo('manager'), reviewController.updateReview);

module.exports = router;
