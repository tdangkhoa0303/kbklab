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

router.post('/:classLabId/update', updateClassLabTime);

router.delete('/:classLabId/delete', deleteClassLab);

router.get('/getUserClassLabs', getUserClassLabsWithScore);

router.get('/:classLabId/detail', getUserClassLabDetail);

router.use(restrictTo(UserRole.Lecturer, UserRole.HeadDepartment, UserRole.Admin));

router.post('/createClassLab', createClassLab);

export default router;
