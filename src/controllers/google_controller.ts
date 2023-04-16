/* eslint-disable @typescript-eslint/naming-convention */
import { RequestHandler } from 'express';
import dotenv from 'dotenv';
import { reverseGeocodeLocation, placeDetailLocation } from 'util/google';

dotenv.config();

const googleReverseGeocode: RequestHandler = async (req, res, next) => {
  try {
    const latitude = Number(req.query.latitude);
    const longitude = Number(req.query.longitude);
    const geocodeOutput = await reverseGeocodeLocation({ latitude, longitude });
    const placeDetail = await placeDetailLocation({ placeId: geocodeOutput[0].place_id });
    res.status(200).json(placeDetail);
  } catch (e: any) {
    next(e);
  }
};

const googleController = {
  googleReverseGeocode,
};

export default googleController;