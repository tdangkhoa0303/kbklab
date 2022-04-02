import {UserRole} from '@kbklab/api-interfaces';
import {Router} from 'express';
import {fileUploader, protect, restrictTo} from 'middlewares';
import {authenticateByGoogle, getAllLecturers, getUserInfo, importLecturers, login} from './user.controllers';

const router: Router = Router();

router.post('/auth/google', authenticateByGoogle);

router.post('/login', login);

router.use(protect);

router.get('/getUserInfo', getUserInfo);

router.get('/getAllLecturers', restrictTo(UserRole.HeadDepartment, UserRole.Admin), getAllLecturers);

router.post('/importLecturers', restrictTo(UserRole.HeadDepartment, UserRole.Admin), fileUploader.single('file'), importLecturers);

// router.delete('/deleteLecturers', restrictTo(UserRole.Admin), deleteLecturers);

export default router;
