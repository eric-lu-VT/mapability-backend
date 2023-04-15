import { RequestHandler } from 'express';
import { ValidatedRequest } from 'express-joi-validation';
import { BaseError } from 'errors';
import { getSuccessfulDeletionMessage } from 'util/constants';
import { CreateBathroomRequest, UpdateBathroomRequest } from 'validation/bathroom';
import { bathroomService } from 'services';

const createBathroom: RequestHandler = async (req: ValidatedRequest<CreateBathroomRequest>, res, next) => {
  try {
    const savedBathroom = await bathroomService.createBathroom(req.body);
    res.status(201).json(savedBathroom);
  } catch (error) {
    next(error);
  }
};

const getBathrooms: RequestHandler = async (req, res, next) => {
  try { 
    const bathrooms = await bathroomService.getBathrooms({
      ...req.query,
    });
    res.status(200).json(bathrooms);
  } catch (error) {
    next(error);
  }
};

const getBathroom: RequestHandler = async (req, res, next) => {
  try {
    const bathrooms = await bathroomService.getBathrooms({
      id: req.params.id,
      ...req.query,
    });

    if (bathrooms.length === 0) throw new BaseError('Bathroom not found', 404);
    else if (bathrooms.length > 1) throw new BaseError('Multiple Bathroom entries found', 404);
    else res.status(200).json(bathrooms[0]);
  } catch (error) {
    next(error);
  }
};

const updateBathroom: RequestHandler = async (req: ValidatedRequest<UpdateBathroomRequest>, res, next) => {
  try {
    // Ensure that user cannot update protected fields
    const { location, reviews, ...updatedFields } = req.body;

    const bathroom = await bathroomService.updateBathroom(req.params.id, updatedFields);
    res.status(200).json(bathroom);
  } catch (error) {
    next(error);
  }
};

const deleteBathroom: RequestHandler = async (req, res, next) => {
  try {
    await bathroomService.deleteBathroom(req.params.id);
    res.status(200).json({ message: getSuccessfulDeletionMessage(req.params.id) });
  } catch (error) {
    next(error);
  }
};

const bathroomController = {
  createBathroom,
  getBathrooms,
  getBathroom,
  updateBathroom,
  deleteBathroom,
};

export default bathroomController;
