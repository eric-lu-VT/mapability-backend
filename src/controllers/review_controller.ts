import { RequestHandler } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { BaseError } from 'errors';
import { getSuccessfulDeletionMessage } from 'util/constants';
import { createReviewRequest, UpdateReviewRequest } from 'validation/review';
import { reviewService } from 'services';

const createReview: RequestHandler = async (req: ValidatedRequest<createReviewRequest>, res, next) => {
  try {
    const savedReview = await reviewService.createReview(req.body);
    res.status(201).json(savedReview);
  } catch (error) {
    next(error);
  }
};

const getReviews: RequestHandler = async (req, res, next) => {
  try { 
    const reviews = await reviewService.getReviews({
      ...req.query,
    });
    res.status(200).json(reviews);
  } catch (error) {
    next(error);
  }
};

const getReview: RequestHandler = async (req, res, next) => {
  try {
    const reviews = await reviewService.getReviews({
      id: req.params.id,
      ...req.query,
    });

    if (reviews.length === 0) throw new BaseError('Review not found', 404);
    else if (reviews.length > 1) throw new BaseError('Multiple Review entries found', 404);
    else res.status(200).json(reviews[0]);
  } catch (error) {
    next(error);
  }
};

const updateReview: RequestHandler = async (req: ValidatedRequest<UpdateReviewRequest>, res, next) => {
  try {
    const { userId, rating, comment } = req.body;
    const review = await reviewService.getReview(req.params.id);

    // Check if user is the creator of the review
    if (review.userId !== userId) {
      throw new Error('You are not authorized to update this review');
    }

    review.rating = typeof rating !== 'undefined' ? rating : review.rating;
    review.comment = typeof comment !== 'undefined' ? comment : review.comment;

    const updatedReview = await reviewService.updateReview(req.params.id, review);
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
};

const deleteReview: RequestHandler = async (req, res, next) => {
  try {
    await reviewService.deleteReview(req.params.id);
    res.status(200).json({ message: getSuccessfulDeletionMessage(req.params.id) });
  } catch (error) {
    next(error);
  }
};

const reviewController = {
  createReview,
  getReviews,
  getReview,
  updateReview,
  deleteReview,
};

export default reviewController;
