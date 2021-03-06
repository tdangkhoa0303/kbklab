import {ClassDTO, ClassWithClassLabDTO, ImportClassResponseData, UserDTO, UserRole} from '@kbklab/api-interfaces';
import {Class, User} from 'entities';
import {ClassLabModel, ClassModel, UserModel} from 'infra/database/models';
import isEmpty from 'lodash/isEmpty';
import {AppError} from 'models';
import {read, utils} from 'xlsx';
import {createUser} from '../user/user.actions';
import {normalizeSettledResult} from '../user/user.utils';
import * as ClassesQueries from './class.queries';
import {ImportClassPayload, ImportStudentRow} from './class.types';
import {importClassValidator, validatorClassesOwnership} from './class.validators';

export const importClass = async (fields: ImportClassPayload, user): Promise<ImportClassResponseData> => {
  const {lecturerId, classCode, file} = fields;

  await importClassValidator(fields);

  const classLecturerId = user.role === UserRole.Lecturer ? user.id : lecturerId;
  const lecturer = await UserModel.findById(classLecturerId);

  const importingClassData = read(file.buffer);
  const studentsOfClass = utils.sheet_to_json<ImportStudentRow>(importingClassData.Sheets[importingClassData.SheetNames[0]],);
  const createStudentSettledResult = await Promise.allSettled<UserDTO>(
    studentsOfClass.map(({fullName, email}) => createUser({
      email,
      name: fullName,
      role: UserRole.Student
    }, true))
  );

  const {data, errorRows} = normalizeSettledResult<UserDTO>(createStudentSettledResult);
  if(!isEmpty(errorRows)) {
    throw new AppError('There are some invalid rows in the sheet. Please fix them and try again.', 400, errorRows);
  }

  const importedClass: Class = await ClassModel.create({
    lecturer: lecturer,
    students: data.map(student => student.id),
    code: classCode,
  });
  const classDTO: ClassWithClassLabDTO = await importedClass
    .populate(['lecturer', 'students'])
    .then(data => ({
      ...data.toObject<ClassDTO>(),
      classLabs: {},
    }))

  return {
    class: classDTO,
    errorRows,
  }
}

export const getAllClassesWithClassLabs = async (user: User): Promise<ClassWithClassLabDTO[]> => {
  const lecturer = user.role < UserRole.HeadDepartment ? user._id : undefined;
  return ClassesQueries.getAllClassesWithClassLabs(lecturer)
}

export const deleteClass = async (classId: string): Promise<boolean> => {
  const currentClass = await ClassModel.findById(classId);
  if(!currentClass) {
    throw new AppError('Cannot find class with this id', 400);
  }

  const classLabs = await ClassLabModel.find({class: classId});
  if(classLabs.length) {
    throw new AppError('Cannot delete class has created class lab', 400)
  }

  return currentClass.delete();
}

export const deleteClasses = async (classIds, user): Promise<boolean> => {
  if(user.role < UserRole.HeadDepartment) {
    await validatorClassesOwnership(classIds, user)
      .catch(err => {
        throw err;
      })
  }

  return !!(await Promise.all(
    classIds.map(classId => deleteClass(classId))
  ))
}
