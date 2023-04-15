import joi from 'joi';
import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import { IReview } from 'db/models/review_model';
import { BaseError, getFieldNotFoundError } from 'errors';

export const CreateReviewSchema = joi.object<IReview>({
  bathroomId: joi.string().required().error(() => {
    throw new BaseError(getFieldNotFoundError('bathroomId'), 400);
  }),
  userId: joi.string().required().error(() => {
    throw new BaseError(getFieldNotFoundError('userId'), 400);
  }),
  rating: joi.number().required().error(() => {
    throw new BaseError(getFieldNotFoundError('rating'), 400);
  }),
  comment: joi.string().optional(),
});

export interface CreateReviewRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: IReview
}

export const UpdateReviewSchema = joi.object<IReview>({
  bathroomId: joi.string(),
  userId: joi.string(),
  rating: joi.number(),
  comment: joi.string(),
});

export interface UpdateReviewRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Partial<IReview>
}
