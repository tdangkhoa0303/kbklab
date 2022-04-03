import {ClassLabDTO, UserRole} from '@kbklab/api-interfaces';
import {Class, Lab, User} from 'entities';
import {AppError} from 'models';
import {InstanceModel} from '../../../infra/database/models';

export interface AttemptingClassLabDTO extends Omit<Omit<ClassLabDTO, 'class'>, 'lab'> {
  class: Class,
  lab: Lab
}

export interface CreateStudentInstanceValidatorParams {
  user: User;
  attemptingClassLabDTO: AttemptingClassLabDTO | undefined
}

/**
 * Validate if a student can attempt a class lab
 * Rules:
 * - A student can only attempt 1 lab at a time
 * - A student cannot attempt a lab that is not belong to his/her class
 * @param params
 */
export const createStudentInstanceValidator = async (params: CreateStudentInstanceValidatorParams): Promise<void> => {
  const {user, attemptingClassLabDTO} = params;
  const {_id} = user;
  if(!attemptingClassLabDTO || !attemptingClassLabDTO.lab.location) {
    throw new AppError('Cannot find attempting class lab', 400);
  }

  const {class: currentClass, endDate, startDate} = attemptingClassLabDTO;
  if(user.role < UserRole.Lecturer) {
    if (currentClass.students.indexOf(_id) < 0) {
      throw new AppError('This lab does not belong to your class', 400)
    }

    const existedInstance = await InstanceModel.findOne({user});
    if (existedInstance) {
      throw new AppError('You can only do 1 lab at a time', 400)
    }
  }

  const currentDate = new Date();
  if (currentDate > endDate || currentDate < startDate) {
    throw new AppError('It is not time for doing the lab', 400);
  }
}
