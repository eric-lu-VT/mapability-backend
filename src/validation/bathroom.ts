import joi from 'joi';
import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import { BaseError, getFieldNotFoundError } from 'errors';
import { IBathroom } from 'db/models/bathroom_model';

export const CreateBathroomSchema = joi.object<IBathroom>({
  name: joi.string().required().error(() => {
    throw new BaseError(getFieldNotFoundError('name'), 400);
  }),
  location: joi.object().keys({
    type: joi.string(),
    coordinates: joi.array().items(joi.number()),
  }).required().error(() => {
    throw new BaseError(getFieldNotFoundError('location'), 400);
  }),
  description: joi.string().required().error(() => {
    throw new BaseError(getFieldNotFoundError('description'), 400);
  }),
  unisex: joi.boolean().required().error(() => {
    throw new BaseError(getFieldNotFoundError('unisex'), 400);
  }),
  levels: joi.array().items(joi.string()).required().error(() => {
    throw new BaseError(getFieldNotFoundError('levels'), 400);
  }),
  hasElevatorAccess: joi.boolean().required().error(() => {
    throw new BaseError(getFieldNotFoundError('hasElevatorAccess'), 400);
  }),
  hasGrabBars: joi.boolean().required().error(() => {
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
});

export interface CreateBathroomRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: IBathroom
}

export const UpdateBathroomSchema = joi.object<IBathroom>({
  id: joi.string(),
  name: joi.string(),
  location: joi.object().keys({
    type: joi.string(),
    coordinates: joi.array().items(joi.number()),
  }),
  description: joi.string(),
  unisex: joi.boolean(),
  levels: joi.array().items(joi.string()),
  hasElevatorAccess: joi.boolean(),
  hasGrabBars: joi.boolean(),
  isSingleUse: joi.boolean(),
  buildingRampAccess: joi.boolean(),
  changingTable: joi.boolean(),
  accessibleDoor: joi.boolean(),
  hasMenstrualProducts: joi.boolean(),
});

export interface UpdateBathroomRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Partial<IBathroom>
}
