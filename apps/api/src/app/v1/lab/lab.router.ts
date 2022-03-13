import {Router} from 'express';
import {protect} from 'middlewares';
import {updateClassLabTime} from './classLab.controllers';

const router: Router = Router();

router.use(protect);

router
  .route('/:classLabId')
  .patch(updateClassLabTime);

export default router;
