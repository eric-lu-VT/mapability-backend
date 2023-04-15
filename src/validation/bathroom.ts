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
  unisex: joi.string().required().error(() => {
    throw new BaseError(getFieldNotFoundError('unisex'), 400);
  }),
  levels: joi.array().items(joi.string()).required().error(() => {
    throw new BaseError(getFieldNotFoundError('levels'), 400);
  }),
  hasElevatorAccess: joi.boolean().required().error(() => {
    throw new BaseError(getFieldNotFoundError('hasElevatorAccess'), 400);
  }),
  hasGrabBars: joi.number().required().error(() => {
    throw new BaseError(getFieldNotFoundError('hasGrabBars'), 400);
  }),
  isSingleUse: joi.boolean().optional().required().error(() => {
    throw new BaseError(getFieldNotFoundError('isSingleUse'), 400);
  }),
  buildingRampAccess: joi.boolean().optional().required().error(() => {
    throw new BaseError(getFieldNotFoundError('buildingRampAccess'), 400);
  }),
  changingTable: joi.boolean().optional().required().error(() => {
    throw new BaseError(getFieldNotFoundError('changingTable'), 400);
  }),
  accessibleDoor: joi.boolean().optional().required().error(() => {
    throw new BaseError(getFieldNotFoundError('accessibleDoor'), 400);
  }),
  hasMenstrualProducts: joi.boolean().optional().required().error(() => {
    throw new BaseError(getFieldNotFoundError('hasMenstrualProducts'), 400);
  }),
  reviews: joi.array().items(joi.string()).optional().required().error(() => {
    throw new BaseError(getFieldNotFoundError('reviews'), 400);
  }),
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
  unisex: joi.string(),
  levels: joi.array().items(joi.string()),
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
