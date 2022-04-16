import {UserRole} from '@kbklab/api-interfaces';
import {Router} from 'express';
import {fileUploader, protect, restrictTo} from 'middlewares';
import {deleteClasses, getAllClasses, importClass} from './class.controllers';

const router: Router = Router();

router.use(protect);

router.use(restrictTo(UserRole.HeadDepartment, UserRole.Admin, UserRole.Lecturer));

router
  .route('/')
  .get(getAllClasses)
  .post(fileUploader.single('file'), importClass);

router
  .route('/delete')
  .post(deleteClasses);

export default router;
