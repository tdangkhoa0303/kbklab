import {Router} from 'express';
import {protect} from 'middlewares';
import {getAllLabs} from './lab.controllers';

const router: Router = Router();

router.use(protect);

router.get('/', getAllLabs);

// router.post('/:labId/instances', setLabStudentIds, createInstance);
//
// router.post('/finishAttempt', finishLab);



export default router;
