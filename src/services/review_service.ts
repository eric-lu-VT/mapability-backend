// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import DocumentNotFoundError from 'errors/DocumentNotFoundError';
import ReviewModel, { IReview } from 'db/models/review_model';
import { BaseError } from 'errors';
import { HydratedDocument } from 'mongoose';

export interface ReviewParams {
  id?: string;
  bathroomId?: string;
  userId?: string;
  rating?: number;
  comment?: string;
}

const constructQuery = (params: ReviewParams) => {
  return {
    ...params,
  };
};

const getReviews = async (params: ReviewParams): Promise<HydratedDocument<IReview>[]> => {
  const query = constructQuery(params);
  
  try {
    return await ReviewModel.find(query);
  } catch (e : any) {
    throw new BaseError(e.message, 500);
  }
};

const updateReview = async (id: string, params: ReviewParams): Promise<HydratedDocument<IReview>> => {
  const review = await ReviewModel.findOneAndUpdate({ id }, params, { new: true });
  if (!review) throw new DocumentNotFoundError(id);
  return review;
};

const deleteReview = async (id: string): Promise<HydratedDocument<IReview>> => {
  const deletedReview = await ReviewModel.findOneAndDelete({ id });
  if (!deletedReview) throw new DocumentNotFoundError(id);
  return deletedReview;
};

const createReview = async (review: Pick<IReview, 'bathroomId' | 'userId' | 'rating' | 'comment'>): Promise<HydratedDocument<IReview>> => {
  try {
    return await ReviewModel.create({ 
      id: uuidv4(),
      ...review, 
    });
  } catch (e : any) {
    throw e;
  }
};


const reviewService = {
  createReview,
  getReviews,
  updateReview,
  deleteReview,
};

export default reviewService;
