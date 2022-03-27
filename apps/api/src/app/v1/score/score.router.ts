import {Router} from 'express';
import {protect} from 'middlewares';
import {getClassScores, updateScore} from './score.controllers';

const router: Router = Router();

router.patch('/', updateScore);

router.use(protect);

router.get('/classScores', getClassScores);

export default router;
