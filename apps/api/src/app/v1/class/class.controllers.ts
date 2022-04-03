import {ClassWithClassLabDTO} from '@kbklab/api-interfaces';
import {AuthenticatedRequest} from 'models';
import {apiWrapper} from 'utils';
import * as ClassActions from './class.actions';

export const importClass = apiWrapper((req: AuthenticatedRequest) => {
  const {classCode, lecturerId} = req.body;

  return ClassActions.importClass(
    {
      classCode,
      lecturerId,
      file: req.file
    },
    req.user
  )
})

export const getAllClasses = apiWrapper<ClassWithClassLabDTO[]>((req: AuthenticatedRequest) => {
  const {user} = req;
  return ClassActions.getAllClassesWithClassLabs(user);
});
