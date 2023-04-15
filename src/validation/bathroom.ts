import joi from 'joi';
import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import { BaseError, getFieldNotFoundError } from 'errors';
import { IBathroom } from 'db/models/bathroom_model';

export const CreateBathroomSchema = joi.object<IBathroom>({
  id: joi.string().required().error(() => {
    throw new BaseError(getFieldNotFoundError('id'), 400);
  }),
  location: joi.object({
    type: joi.string().required(),
    coordinates: joi.array().items(joi.number()).required(),
  }),
  gender: joi.string().required().error(() => {
    throw new BaseError(getFieldNotFoundError('gender'), 400);
  }),
  level: joi.number().required().error(() => {
    throw new BaseError(getFieldNotFoundError('level'), 400);
  }),
  hasElevatorAccess: joi.boolean().required().error(() => {
    throw new BaseError(getFieldNotFoundError('hasElevatorAccess'), 400);
  }),
  hasGrabBars: joi.number().required().error(() => {
    throw new BaseError(getFieldNotFoundError('hasGrabBars'), 400);
  }),
  isSingleUse: joi.boolean().optional(),
  buildingRampAccess: joi.boolean().optional(),
  changingTable: joi.boolean().optional(),
  accessibleDoor: joi.boolean().optional(),
  hasMenstrualProducts: joi.boolean().optional(),
  reviews: joi.array().items(joi.string()).optional(),
});

export interface CreateBathroomRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: IBathroom
}

export const UpdateBathroomSchema = joi.object<IBathroom>({
  id: joi.string(),
  location: joi.object({
    type: joi.string(),
    coordinates: joi.array().items(joi.number()),
  }),
  gender: joi.string(),
  level: joi.number(),
  hasElevatorAccess: joi.boolean(),
  hasGrabBars: joi.number(),
  isSingleUse: joi.boolean(),
  buildingRampAccess: joi.boolean(),
  changingTable: joi.boolean(),
  accessibleDoor: joi.boolean(),
  hasMenstrualProducts: joi.boolean(),
  reviews: joi.array().items(joi.string()),
});

export interface UpdateBathroomRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Partial<IBathroom>
}
