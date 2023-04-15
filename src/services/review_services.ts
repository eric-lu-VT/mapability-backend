// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import DocumentNotFoundError from 'errors/DocumentNotFoundError';
import ReviewModel, { IReview } from 'db/models/review_model';
import { BaseError } from 'errors';
import { HydratedDocument } from 'mongoose';

export interface ReviewParams {
  bathroomId: string;
  userId: string;
  rating: number;
  comment?: string;
}

const constructQuery = (params: ReviewParams) => {
  return {
    ...params,
  };
};

const getResources = async (params: ReviewParams): Promise<HydratedDocument<IReview>[]> => {
  const query = constructQuery(params);
  
  try {
    return await ReviewModel.find(query);
  } catch (e : any) {
    throw new BaseError(e.message, 500);
  }
};

const updateResource = async (id: string, params: ReviewParams): Promise<HydratedDocument<IReview>> => {
  const resource = await ReviewModel.findOneAndUpdate({ id }, params, { new: true });
  if (!resource) throw new DocumentNotFoundError(id);
  return resource;
};

const deleteResource = async (id: string): Promise<HydratedDocument<IReview>> => {
  const deletedResource = await ReviewModel.findOneAndDelete({ id });
  if (!deletedResource) throw new DocumentNotFoundError(id);
  return deletedResource;
};

const createResource = async (resource: Pick<IReview, 'bathroomId' | 'userId' | 'rating' | 'comment'>): Promise<HydratedDocument<IReview>> => {
  try {
    return await ReviewModel.create({ 
      ...resource, 
    });
  } catch (e : any) {
    throw e;
  }
};


const resourceService = {
  createResource,
  getResources,
  updateResource,
  deleteResource,
};

export default resourceService;
