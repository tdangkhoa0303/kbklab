import {UserRole} from '@kbklab/api-interfaces';
import {Router} from 'express';
import {protect, restrictTo} from 'middlewares';
import {
  createClassLab,
  deleteClassLab,
  getUserClassLabDetail,
  getUserClassLabsWithScore,
  updateClassLabTime
} from './classLab.controllers';

const router: Router = Router();

router.use(protect);

router
  .route('/:classLabId')
  .post(updateClassLabTime)
  .delete(deleteClassLab);

router.route('/getUserClassLabs').get(getUserClassLabsWithScore);

router.route('/:classLabId/detail').get(getUserClassLabDetail);

router.use(restrictTo(UserRole.Lecturer, UserRole.HeadDepartment, UserRole.Admin));

router.post('/createClassLab', createClassLab);

export default router;
