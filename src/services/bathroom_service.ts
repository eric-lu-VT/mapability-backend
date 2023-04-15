// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import DocumentNotFoundError from 'errors/DocumentNotFoundError';
import BathroomModel, { IBathroom } from 'db/models/bathroom_model';
import { BaseError } from 'errors';
import { HydratedDocument } from 'mongoose';
import { IReview } from '../db/models/review_model';

export interface BathroomParams {
  id?: string;
  name?: string;
  location?: any; // TODO: Fix
  description?: string;
  unisex?: boolean;
  levels?: string[];
  hasElevatorAccess?: boolean;
  hasGrabBars?: boolean;
  isSingleUse?: boolean;
  buildingRampAccess?: boolean;
  changingTable?: boolean;
  accessibleDoor?: boolean;
  hasMenstrualProducts?: boolean;
  reviews?: IReview[],

  searchLng?: number,
  searchLat?: number,
  searchRadius?: number, // km
}

const KM_TO_DEG = (1 / 111.12);

const constructQuery = (params: BathroomParams) => {
  const searchPayload = {
    ...params,
  };

  if (params.searchLng && params.searchLat && params.searchRadius) {
    searchPayload.location = {
      $geoWithin: { 
        $centerSphere: [[params.searchLng, params.searchLat], (params.searchRadius * KM_TO_DEG)], // Radius of the circle in the query is in degrees
      },
    };
  }
  
  return searchPayload;
};

const getBathrooms = async (params: BathroomParams): Promise<HydratedDocument<IBathroom>[]> => {
  const query = constructQuery(params);
  
  try {
    return await BathroomModel.find(query);
  } catch (e : any) {
    throw new BaseError(e.message, 500);
  }
};

const updateBathroom = async (id: string, params: BathroomParams): Promise<HydratedDocument<IBathroom>> => {
  const bathroom = await BathroomModel.findOneAndUpdate({ id }, params, { new: true });
  if (!bathroom) throw new DocumentNotFoundError(id);
  return bathroom;
};

const deleteBathroom = async (id: string): Promise<HydratedDocument<IBathroom>> => {
  const deletedBathroom = await BathroomModel.findOneAndDelete({ id });
  if (!deletedBathroom) throw new DocumentNotFoundError(id);
  return deletedBathroom;
};

// TODO: Can also do Omit<...> instead
const createBathroom = async (bathroom: Omit<IBathroom, 'id'>): Promise<HydratedDocument<IBathroom>> => {
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
  updateBathroom,
  deleteBathroom,
};

export default bathroomService;
