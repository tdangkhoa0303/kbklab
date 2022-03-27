import {ClassLabDTO} from './classLab';
import {UserDTO} from './user';

export interface ClassDTO {
  id: string;
  students: UserDTO[];
  code: string;
  lecturer: UserDTO;
  classLabs: ClassLabDTO[]
}

export interface ImportClassResponseData {
  class: ClassWithClassLabDTO;
  errorRows: number[]
}

export interface ClassWithClassLabDTO {
  id: string,
  classLabs: Record<string, ClassLabDTO>,
  students: UserDTO[],
  code: string,
  lecturer: UserDTO,
}
