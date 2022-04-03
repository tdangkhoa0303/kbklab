import {UserRole} from '@kbklab/api-interfaces';
import child_process from 'child_process';
import {Lab, User} from 'entities';
import {environment} from 'environments/environment';
import {ClassLabModel, InstanceModel} from 'infra/database/models';

export const deleteDocker = async (studentCode: string, instanceId: string) => {
  const instanceToDelete = await InstanceModel.findById(instanceId);
  if (!instanceToDelete) {
    return;
  }

  instanceToDelete.delete();
  child_process.exec(`python3 ${environment.toolPath}/instance.py --stop --student-code=${studentCode}`);
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

  const existedInstance = await InstanceModel.findOne({
    user: user.id,
    classLab: {$in: similarClassLabIds},
  });

  if (existedInstance) {
    await existedInstance.delete();
    child_process.exec(`python3 ${environment.toolPath}/instance.py --stop --student-code=${user.code}`);
  }
};
