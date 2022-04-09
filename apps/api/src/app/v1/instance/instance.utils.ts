import {ClassLabDTO, UserRole} from '@kbklab/api-interfaces';
import child_process from 'child_process';
import {Lab, User} from 'entities';
import {environment} from 'environments/environment';
import {ClassLabModel, InstanceModel} from 'infra/database/models';
import {AppError} from 'models';
import {promisify} from 'util';
import {buildLabLocationPath} from 'utils';

const promisified_exec = promisify(child_process.exec);

export const deleteDocker = async (studentCode: string, instanceId: string) => {
  const instanceToDelete = await InstanceModel
    .findById(instanceId)
    .populate<{classLab: ClassLabDTO}>({path: 'classLab', populate: 'lab'});

  if (!instanceToDelete) {
    return;
  }

  const {classLab: {lab}} = instanceToDelete;
  instanceToDelete.delete();
  child_process.exec(`python3 ${environment.toolPath}/instance.py --stop --student-code=${studentCode} --image=${lab.instanceNames}`);
};

export interface CreateLecturerInstanceValidatorParams {
  user: User;
  currentLab: Lab;
}

/**
 * This util help to remove all lecturer instances if needed
 * - Check if the lecturer has attempted any instance with the same lab
 * - Kill any existing instances containing the same lab
 * @param params
 */
export const removeLecturerInstancesIfNeeded = async (params: CreateLecturerInstanceValidatorParams): Promise<void> => {
  const {user, currentLab} = params;
  if(user.role < UserRole.Lecturer) {
    return;
  }
  // Find all classLab contains current lab
  const similarClassLabIds = await ClassLabModel
    .find({lab: currentLab.id})
    .then(classLabs => classLabs.map(classLab => classLab.id));

  const existedInstance = await InstanceModel
    .findOne({
      user: user.id,
      classLab: {$in: similarClassLabIds},
    })
    .populate<{classLab: ClassLabDTO}>({path: 'classLab', populate: 'lab'});;

  if (existedInstance) {
    const {classLab: {lab}} = existedInstance;
    await existedInstance.delete();
    child_process.exec(`python3 ${environment.toolPath}/instance.py --stop --student-code=${user.code} --image=${lab.instanceNames}`);
  }
};

export interface InitDockerInstanceReturnedValue {
  url: string;
  containerId: string;
}

export const initDockerInstance = async (userCode: string, labLocation: string): Promise<InitDockerInstanceReturnedValue> => {
  // init docker
  await promisified_exec(
    `python3 ${environment.toolPath}/instance.py --start --student-code=${userCode} --lab-location=${buildLabLocationPath(labLocation)}`,
  );

  const {stdout, stderr} = await promisified_exec(`python3 ${environment.toolPath}/instance.py --get-url --student-code=${userCode}`)
    .then(({stdout, stderr}) => ({
      stderr: stderr.trim(),
      stdout: stdout.trim()
    }))
    .catch(err => {
      throw new Error(err)
    });

  if (!stdout) {
    throw new AppError(stderr, 500);
  }

  const stdoutSplit = stdout.split(' ');
  const containerId = stdoutSplit[0] || '';
  const found = stdoutSplit[1] || '';
  return {
    containerId,
    url: `https://${found.replace('\n', '')}`
  };
}
