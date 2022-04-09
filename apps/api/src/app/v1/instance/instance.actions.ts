import {ClassLabDTO} from '@kbklab/api-interfaces';
import * as child_process from 'child_process';
import {Class, Lab, User} from 'entities';
import {environment} from 'environments/environment';
import {ClassLabModel, InstanceModel} from 'infra/database/models';
import schedule from 'node-schedule';
import {initializeScore} from '../score/score.actions';
import {deleteDocker, initDockerInstance, removeLecturerInstancesIfNeeded} from './instance.utils';
import {createStudentInstanceValidator} from './instance.validators';

export const rescheduleInstance = async (studentCode: string, instanceId: string, endTime: number) => {
  schedule.cancelJob(instanceId);

  schedule.scheduleJob(instanceId, endTime, () => {
    deleteDocker(studentCode, instanceId);
  });
};

export const createInstance = async (user: User, classLabId: string): Promise<ClassLabDTO> => {
  const {code: userCode} = user;
  const classLab = await ClassLabModel.findById(classLabId)
    .populate<{lab: Lab}>({
      path: 'lab',
      select: '+location'
    })
    .populate<{class: Class}>('class');

  await createStudentInstanceValidator({
    user,
    attemptingClassLabDTO: classLab
  })

  await removeLecturerInstancesIfNeeded({
    user,
    currentLab: classLab.lab
  })

  // Init Docker instance
  const {url: instanceUrl, containerId} = await initDockerInstance(user.code, classLab.lab.location)

  // Create instance
  const expiredTime: number = environment.instanceTimeout;
  let endTime: number = Date.now() + expiredTime * 60 * 60 * 1000;
  if (endTime > Date.parse(classLab.endDate.toDateString())) {
    endTime = Date.parse(classLab.endDate.toDateString());
  }

  const startTime = Date.now();
  const instance = await InstanceModel.create({
    classLab: classLab.id,
    instanceUrl,
    containerId,
    user: user.id,
    startTime,
    endTime,
  });

  // Create score
  const instanceId = instance.id;
  const initialScore = await initializeScore(instance.user, instance.classLab);
  schedule.scheduleJob(instanceId.toString(), endTime, function () {
    deleteDocker(userCode, instanceId);
  });

  const classLabDTO = (await classLab.populate({path: 'lab', select: '-location'}));

  return {
    ...classLabDTO.toObject<ClassLabDTO>(),
    class: classLab.class.id,
    url: instanceUrl,
    stepSuccess: initialScore.stepSuccess,
  }
};

export const finishAttempt = async (user: User, classLabId: string): Promise<string> => {
  const instanceToDelete = await InstanceModel
    .findOne({
      user: user.id,
      classLab: classLabId,
    })
    .populate<{classLab: ClassLabDTO}>({
      path: 'classLab',
      populate: 'lab'
    });

  if (instanceToDelete) {
    const {classLab: {lab}} = instanceToDelete;
    child_process.exec(
      `python3 ${environment.toolPath}/instance.py --stop --student-code=${user.code} --image=${lab.instanceNames}`
    );
    await instanceToDelete.delete();
  }

 return classLabId;
}
