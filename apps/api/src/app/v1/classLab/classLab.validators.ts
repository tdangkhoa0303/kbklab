import {ClassModel, LabModel} from 'infra/database/models';
import {ConstraintErrorCode} from 'models';
import {createValidator, FieldValidator} from 'utils';
import {requiredValidator} from 'utils/validators';
import {CreateClassLabPayload, UpdateClassLabPayload} from './classLab.types';

export const updateClassLabPayloadValidator = createValidator<UpdateClassLabPayload>({
  classLabId: [requiredValidator],
});

export const isClassExisted: FieldValidator<CreateClassLabPayload> = async (classId: string) => {
  const currentClass = await ClassModel.findById(classId);
  return currentClass ? null : ConstraintErrorCode.Existed;
};

export const isLabExisted: FieldValidator<CreateClassLabPayload> = async (labId: string) => {
  const lab = await LabModel.findById(labId);
  return lab ? null : ConstraintErrorCode.Existed;
};

export const createClassLabPayloadValidator = createValidator<CreateClassLabPayload>({
  classId: [requiredValidator, isClassExisted],
  labId: [requiredValidator, isLabExisted],
  startDate: [requiredValidator],
  endDate: [requiredValidator],
})
