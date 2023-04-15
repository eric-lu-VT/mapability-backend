// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import DocumentNotFoundError from 'errors/DocumentNotFoundError';
import BathroomModel, { IBathroom } from 'db/models/bathroom_model';
import { BaseError } from 'errors';
import { HydratedDocument } from 'mongoose';

export interface BathroomParams {
  location: {
    type: string;
    coordinates: [number, number];
  };
  accessibilityFeatures?: string[];
}

const constructQuery = (params: BathroomParams) => {
  return {
    ...params,
  };
};

const getBathrooms = async (params: BathroomParams): Promise<HydratedDocument<IBathroom>[]> => {
  const query = constructQuery(params);
  
  try {
    return await BathroomModel.find(query);
  } catch (e : any) {
    throw new BaseError(e.message, 500);
  }
};

const updateBathrooms = async (id: string, params: BathroomParams): Promise<HydratedDocument<IBathroom>> => {
  const bathroom = await BathroomModel.findOneAndUpdate({ id }, params, { new: true });
  if (!bathroom) throw new DocumentNotFoundError(id);
  return bathroom;
};

const deleteBathroom = async (id: string): Promise<HydratedDocument<IBathroom>> => {
  const deletedBathroom = await BathroomModel.findOneAndDelete({ id });
  if (!deletedBathroom) throw new DocumentNotFoundError(id);
  return deletedBathroom;
};


//unsure about this
const createBathroom = async (bathroom: Pick<IBathroom, 'location' | 'accessibilityFeatures' | 'reviews' >): Promise<HydratedDocument<IBathroom>> => {
  try {
    return await BathroomModel.create({ 
      ...bathroom, 
      id: uuidv4(),
    });
  } catch (e : any) {
    throw e;
  }
};

const bathroomService = {
  createBathroom,
  getBathrooms,
  updateBathrooms,
  deleteBathroom,
};

export default bathroomService;
