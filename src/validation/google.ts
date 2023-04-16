import joi from 'joi';
import { ValidatedRequestSchema, ContainerTypes } from 'express-joi-validation';
import { IResource } from 'db/models/resource_model';
import { BaseError, getFieldNotFoundError } from 'errors';

export const GoogleReverseGeocodeRequest = joi.object({
  latitude: joi.number().required().error(() => {
    throw new BaseError(getFieldNotFoundError('title'), 400);
  }),
  longitude: joi.string().required().error(() => {
    throw new BaseError(getFieldNotFoundError('description'), 400);
  }),
});

export interface CreateResourceRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: IResource
}
