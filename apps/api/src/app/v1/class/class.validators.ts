import {UserDTO} from '@kbklab/api-interfaces';
import {createValidator} from 'utils';
import {requiredValidator} from 'utils/validators';
import {ClassModel} from 'infra/database/models';
import {AppError} from 'models';
import {ImportClassPayload} from './class.types';

export const importClassValidator = createValidator<ImportClassPayload>({
  file: [requiredValidator],
  classCode: [requiredValidator],
  lecturerId: [requiredValidator]
});

export const validatorClassesOwnership = async (classIds: string[], user: UserDTO): Promise<void[]> => {
  return Promise.all(
    classIds.map(classId => (
      ClassModel.findOne({
        lecturer: user.id,
        _id: classId,
      }).then(currentClass => {
        if(!currentClass) {
          throw new AppError('You cannot delete the class not belong to you.', 403)
        }
      })
    ))
  )
}

