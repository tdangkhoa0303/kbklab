import {Router} from 'express';
import {protect} from 'middlewares';
import {createInstance, finishAttempt} from './instance.controllers';

const router: Router = Router();

router.use(protect);

router.post('/:classLabId/attempt', createInstance);

router.post('/finishAttempt', finishAttempt);

export default router;
