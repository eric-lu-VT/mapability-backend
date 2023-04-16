import bodyParser from 'body-parser';
import express from 'express';
import { createValidator } from 'express-joi-validation';
import requireScope from 'auth/requireScope';
import { bathroomController } from 'controllers';
import { errorHandler } from 'errors';
import { validationErrorHandler } from 'validation';
import { CreateBathroomSchema, UpdateBathroomSchema } from 'validation/bathroom';
import { SCOPES } from 'auth/scopes';

const router = express();
const validator = createValidator({ passError: true });

// TODO: Move middleware attachment to test file
if (process.env.NODE_ENV === 'test') {
  // enable json message body for posting data to router
  router.use(bodyParser.urlencoded({ extended: true }));
  router.use(bodyParser.json());
}

// find and return all bathrooms
router.route('/')
  .post(
    validator.body(CreateBathroomSchema),
    bathroomController.createBathroom,
  )
  .get(
    bathroomController.getBathrooms,
  );

router.route('/:id')
  .get(
    bathroomController.getBathroom,
  )
  .patch(
    validator.body(UpdateBathroomSchema),
    bathroomController.updateBathroom,
  )
  .delete(
    requireScope(SCOPES.USER.name),
    bathroomController.deleteBathroom,
  );

if (process.env.NODE_ENV === 'test') {
  router.use(validationErrorHandler);
  router.use(errorHandler);
}

export default router;
