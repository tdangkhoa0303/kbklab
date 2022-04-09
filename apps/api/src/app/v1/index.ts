import {Router} from 'express';
import classRouter from './class/class.router';
import classLabRouter from './classLab/classLab.router';
import instancesRouter from './instance/instance.router';
import labRouter from './lab/lab.router';
import playgroundRouter from './playground/playground.router';
import scoreRouter from './score/score.router';
import userRouter from './user/user.router';

const router: Router = Router();

router.use('/classes', classRouter);
router.use('/users', userRouter);
router.use('/classLab', classLabRouter);
router.use('/labs', labRouter);
router.use('/scores', scoreRouter);
router.use('/instances', instancesRouter);
router.use('/playgrounds', playgroundRouter)

export default router;
