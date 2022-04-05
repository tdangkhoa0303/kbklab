import {ClassLabDTO, InstanceDTO, LabDTO, ScoreDTO, UserRole} from '@kbklab/api-interfaces';
import {Class, User} from 'entities';
import {environment} from 'environments/environment';
import {ClassLabModel, ClassModel, InstanceModel, ScoreModel} from 'infra/database/models';
import {AppError} from 'models';
import {rescheduleInstance} from '../instance/instance.actions';
import * as ScoreQueries from '../score/score.queries';
import * as ClassLabQueries from './classLab.queries';
import {CreateClassLabPayload, UpdateClassLabPayload} from './classLab.types';
import {createClassLabPayloadValidator, updateClassLabPayloadValidator} from './classLab.validators';

export const updateClassLabTime = async (userId: string, userRole: UserRole, payload: UpdateClassLabPayload): Promise<ClassLabDTO> => {
  const {classLabId, startDate, endDate} = payload;

  await updateClassLabPayloadValidator(payload);

  const updatingClassLab = await ClassLabModel.findById(classLabId).populate<{class: Class}>('class');

  if (userRole === UserRole.Lecturer && updatingClassLab.class.lecturer.toString() !== userId) {
    throw new AppError('This class lab does not belong to this lecturer', 404);
  }

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

export const deleteClassLab = async (classLabId: string): Promise<void> => {
  await updateClassLabPayloadValidator({classLabId});

  const classLabToRemove = await ClassLabModel.findById(classLabId);
  if (!classLabToRemove) {
    throw new AppError('Cannot find lab with that id', 404)
  }
  if (Date.now() >= Date.parse(classLabToRemove.startDate.toLocaleString())) {
    throw new AppError('Cannot delete lab after start date', 400);
  }
  await classLabToRemove.delete();
}

export const createClassLab = async (payload: CreateClassLabPayload): Promise<ClassLabDTO> => {
  const {labId, classId, ...restPayload} = payload;

  await createClassLabPayloadValidator(payload);

  const createdLabClass = await ClassLabModel.create({
    ...restPayload,
    lab: labId,
    class: classId,
  });

  return await createdLabClass
    .populate('lab')
    .then(classLab => classLab.toObject<ClassLabDTO>());
}

export const getLecturerClassLabs = async (user): Promise<ClassLabDTO[]> => {
  const userClassLabs = await ClassLabQueries.getUserClassLabsWithScore(user);
  const userInstances = await InstanceModel.find({
    user: user.id,
  });

  return userClassLabs.map(classLab => {
    const classLabInstance = userInstances.find(instance => instance.classLab.toString() === classLab.id);
    return ({
      ...classLab,
      url: classLabInstance ? classLabInstance.instanceUrl : ''
    })
  })
}

export const getStudentClassLabs = async (userId: string): Promise<ClassLabDTO[]> => {
  const studentClasses = await ClassModel.find({students: userId});
  if(!studentClasses.length) {
    return [];
  }

  const studentClassIds = studentClasses.map(userClass => userClass.id);
  const studentScores: ScoreDTO[] = await ScoreQueries.getUserScores(userId);
  const studentInstances = await InstanceModel.find({
    user: userId,
  });
  const studentClassLabs = await ClassLabModel
    .find<ClassLabDTO>({class: {$in: studentClassIds}})
    .populate({path: 'lab'});

  return studentClassLabs.map((classLab) => {
    const {id: classLabId} = classLab;
    const classLabInstance = studentInstances.find(
      (instance) => instance.classLab.toString() === classLabId,
    );
    const classLabScore = studentScores.find(score => score.classLab.toString() === classLabId)

    return {
     ...classLab,
      stepSuccess: classLabScore ? classLabScore.stepSuccess : [],
      url: classLabInstance ? classLabInstance.instanceUrl : '',
    };
  });
};

export const getUserClassLabsWitchScore = async (user: User): Promise<ClassLabDTO[]> => {
  const {id, role} = user;
  if(role >= UserRole.Lecturer) {
    return await getLecturerClassLabs(user)
  }

  return await getStudentClassLabs(id);
}

export const getUserClassLabDetail = async (classLabId: string, user: User): Promise<ClassLabDTO> => {
  const {id: userId} = user;
  const userClassLab = await ClassLabModel
    .findById(classLabId)
    .populate<{lab: LabDTO}>('lab')
    .populate<{class: Class}>('class');
  if (!userClassLab) {
    throw new AppError('Cannot find class lab with provided id', 404);
  }

  const classLabScore = await ScoreModel.findOne({
    classLab: classLabId,
    user: userId,
  });

  const classLabInstance = await InstanceModel.findOne({
    classLab: classLabId,
    user: userId,
  });

  return {
    ...userClassLab.toObject<ClassLabDTO>(),
    class: userClassLab.class.code,
    stepSuccess: classLabScore ? classLabScore.stepSuccess : [],
    url: classLabInstance ? classLabInstance.instanceUrl : '',
  };
}
