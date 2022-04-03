import {UserRole} from '@kbklab/api-interfaces';
import {Router} from 'express';
import {fileUploader, protect, restrictTo} from 'middlewares';
import {getAllClasses, importClass} from './class.controllers';

const router: Router = Router();

router.use(protect);

router.use(restrictTo(UserRole.HeadDepartment, UserRole.Admin, UserRole.Lecturer));

router
  .route('/')
  .get(getAllClasses)
  .post(fileUploader.single('file'), importClass);

export default router;
