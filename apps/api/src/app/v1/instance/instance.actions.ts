import {ClassLabDTO} from '@kbklab/api-interfaces';
import {Class, Lab, User} from 'entities';
import {environment} from 'environments/environment';
import {ClassLabModel, InstanceModel} from 'infra/database/models';
import schedule from 'node-schedule';
import {promisified_exec} from 'utils';
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
  const {lab: {location, imageNames}} = classLab;
  const {url: instanceUrl, containerId} = await initDockerInstance({location, imageNames, userCode})

  // Create instance
  const expiredTime: number = environment.instanceTimeout;
  let endTime: number = Date.now() + expiredTime * 60 * 60 * 1000;
  if (endTime > Date.parse(classLab.endDate.toLocaleString())) {
    endTime = Date.parse(classLab.endDate.toLocaleString());
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

  const classLabDTO = await classLab.populate({
    path: 'lab',
    select: '-location',
  });

  return {
    ...classLabDTO.toObject<ClassLabDTO>(),
    class: classLab.class.id,
    url: instanceUrl,
    stepSuccess: initialScore.stepSuccess,
  };
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
    await promisified_exec(
      `python3 ${environment.toolPath}/instance.py --stop --student-code=${user.code} --image=${lab.instanceNames}`
    );
    await instanceToDelete.delete();
  }

 return classLabId;
}

export const rescheduleAllJobs = async () => {
  const listInstance = await InstanceModel.find().populate<{user: User}>(
    'user'
  );
  for (const instance of listInstance) {
    schedule.scheduleJob(instance.id, instance.endTime, () => {
      deleteDocker(instance.user.code, instance.id);
    });
  }
};
