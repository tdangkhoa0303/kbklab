import {ClassLabDTO, UserDTO} from '@kbklab/api-interfaces';

export interface ScoreDTO {
  id: string;
  user: UserDTO;
  classLab: ClassLabDTO;
  stepSuccess: boolean[][];
  attempt: number;
}
