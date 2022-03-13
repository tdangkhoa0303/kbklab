import {ClassLabDTO, InstanceDTO} from '@kbklab/api-interfaces';
import {environment} from 'environments/environment';
import {ClassLabModel, InstanceModel} from 'infra/database/models';
import isEmpty from 'lodash/isEmpty';
import {AppError} from 'models';
import {rescheduleInstance} from '../instance/instance.actions';
import {UpdateClassLabPayload} from './classLab.types';
import {updateClassLabPayloadValidator} from './classLab.validators';

export const updateClassLabTime = async (payload: UpdateClassLabPayload): Promise<ClassLabDTO> => {
  const {classLabId, startDate, endDate} = payload;
  const errorFields = updateClassLabPayloadValidator(payload);
  if(!isEmpty(errorFields)) {
    throw new AppError('Invalid payload', 400, errorFields)
  }

  const updatingClassLab = await ClassLabModel.findById(classLabId).populate('lab');
  if (!updatingClassLab) {
    throw new AppError('Cannot find lab with that id', 404);
  }

  if (Date.now() >= Date.parse(updatingClassLab.endDate.toLocaleString())) {
    throw new AppError('Can not modify lab after end date', 400);
  }

  if (startDate && Date.now() >= Date.parse(updatingClassLab.startDate.toLocaleString())) {
    throw new AppError('Cannot updated the startDate of a class if the time began', 400);
  }

  updatingClassLab.startDate = startDate ? startDate : updatingClassLab.startDate;
  updatingClassLab.endDate = endDate ? endDate : updatingClassLab.endDate;
  updatingClassLab.isNew = false;
  updatingClassLab.save();

  if (Date.now() >= Date.parse(updatingClassLab.startDate.toLocaleString())) {
    const listRescheduleInstances = await InstanceModel.find<InstanceDTO>({
      classLab: updatingClassLab.id,
    }).populate('user');

    const timeForLab: number = environment.instanceTimeout * 60 * 60 * 1000;

    for (const instance of listRescheduleInstances) {
      if (instance.endTime - instance.startTime < timeForLab) {
        let newEndTime = instance.startTime + timeForLab;
        if (newEndTime > Date.parse(updatingClassLab.endDate.toLocaleString())) {
          newEndTime = Date.parse(updatingClassLab.endDate.toLocaleString());
        }
        const student = instance.user;
        await rescheduleInstance(student.code, instance.id, newEndTime);
      }
    }
  }

  return updatingClassLab.toObject<ClassLabDTO>();
}
