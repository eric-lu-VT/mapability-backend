import bodyParser from 'body-parser';
import express from 'express';
import { googleController } from 'controllers';
import { errorHandler } from 'errors';
import { validationErrorHandler } from 'validation';

const router = express();

// TODO: Move middleware attachment to test file
if (process.env.NODE_ENV === 'test') {
  // enable json message body for posting data to router
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
}

router.route('/reverse-geocode')
  .get(
    googleController.googleReverseGeocode,
  );

router.route('/text-search-location')
  .get(
    googleController.googleTextSearchLocation,
  );

if (process.env.NODE_ENV === 'test') {
  router.use(validationErrorHandler);
  router.use(errorHandler);
}

export default router;