const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Review = require('../model/reviewModel');
const Object = require('../model/objectModel');
const Initialize = require('../utils/initialize');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const objectId = req.params.objectId;

  let reviews = await Review.findAll();
  reviews = reviews.filter((rev) => rev.objectId == objectId);

  const newReview = new Array();

  for (let review of reviews) {
    review = await Initialize.initializeReview(review);
    newReview.push(review);
  }

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews: newReview },
  });
});

exports.getAllReviewsForUser = catchAsync(async (req, res, next) => {
  const objectId = req.params.objectId;

  let reviews = await Review.findAll();
  reviews = reviews.filter((rev) => rev.objectId == objectId);

  let newReviews = new Array();

  for (let review of reviews) {
    review = await Initialize.initializeReview(review);
    newReviews.push(review);
  }

  newReviews = newReviews.filter(review => review.status == 'APPROVED');

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews: newReviews },
  });
});


exports.updateReview = catchAsync(async (req, res, next) => {
  let newReview = await Review.findByIdAndUpdate(req.params.id, {status: req.body.newStatus});

  if (!newReview) next(new AppError('No review found!', 404));

   newReview = await Initialize.initializeReview(newReview);

  res.status(201).json({ status: 'success', data: { newReview } });
});

exports.createReview = catchAsync(async (req, res, next) => {
    const objectId = req.params.objectId;
    const userId = req.user.id;

  const review = {
    userId: userId,
    objectId: objectId,
    comment: req.body.comment,
    rating: req.body.rating,
    status: "PROCESSING",
  };

  const newReview = await Review.create(review);

  res.status(201).json({
    status: 'success',
    data: {
      newReview,
    },
  });
});


exports.canUserRate = catchAsync(async (req, res, next) => {
    const objectId = req.params.objectId;
    const userId = req.user.id;

  const allReviews = await Review.findAll();
  let canRate = true;
  
  for(const review of allReviews)
  {
    if(review.userId == userId && review.objectId == objectId)
      canRate = false;
  }

  res.status(201).json({
    status: 'success',
    data: {
      canRate,
    },
  });
});


