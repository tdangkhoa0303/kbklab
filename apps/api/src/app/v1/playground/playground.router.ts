import {Router} from 'express';
import {protect} from 'middlewares';
import {attemptPlayground, finishPlayground, getAllPlaygrounds} from './playground.controllers';

const router: Router = Router();

router.use(protect);

router.get('/', getAllPlaygrounds);

router.post('/:playgroundId/attempt', attemptPlayground);

router.post('/:playgroundId/finish', finishPlayground);

export default router;
