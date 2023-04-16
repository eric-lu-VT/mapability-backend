import bodyParser from 'body-parser';
import express from 'express';
import { createValidator } from 'express-joi-validation';
import requireScope from 'auth/requireScope';
import { reviewController } from 'controllers';
import { errorHandler } from 'errors';
import { validationErrorHandler } from 'validation';
import { CreateReviewSchema, UpdateReviewSchema } from 'validation/review';
import { SCOPES } from 'auth/scopes';

const router = express();
const validator = createValidator({ passError: true });

// TODO: Move middleware attachment to test file
if (process.env.NODE_ENV === 'test') {
  // enable json message body for posting data to router
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
}

// find and return all reviews
router.route('/')
  .post(
    validator.body(CreateReviewSchema),
    reviewController.createReview,
  )
  .get(
    reviewController.getReviews,
  );

router.route('/:id')
  .get(
    reviewController.getReview,
  )
  .patch(
    validator.body(UpdateReviewSchema),
    reviewController.updateReview,
  )
  .delete(
    requireScope(SCOPES.USER.name),
    reviewController.deleteReview,
  );

if (process.env.NODE_ENV === 'test') {
  router.use(validationErrorHandler);
  router.use(errorHandler);
}

export default router;
