import {ClassLabDTO, UserDTO} from '@kbklab/api-interfaces';

export interface InstanceDTO {
  id: string;
  user: UserDTO;
  instanceUrl: string;
  classLab: ClassLabDTO;
  containerId: string;
  startTime: number;
  endTime: number;
}
