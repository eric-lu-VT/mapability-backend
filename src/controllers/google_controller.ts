/* eslint-disable @typescript-eslint/naming-convention */
import { RequestHandler } from 'express';
import dotenv from 'dotenv';
import { reverseGeocodeLocation, textSearchLocation, placeDetailLocation } from 'util/google';

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

const googleTextSearchLocation: RequestHandler = async (req, res, next) => {
  try {
    const search = req.query.search as string;
    const textSearchOutput = await textSearchLocation({ query: search });
    const placeDetail = await placeDetailLocation({ placeId: textSearchOutput?.results[0]?.place_id || '' });
    res.status(200).json(placeDetail);
  } catch (e: any) {
    next(e);
  }
};

const googleController = {
  googleReverseGeocode,
  googleTextSearchLocation,
};

export default googleController;