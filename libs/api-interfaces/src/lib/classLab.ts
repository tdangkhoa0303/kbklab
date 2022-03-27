import {LabDTO} from './lab';

export type StepSuccess = boolean[][];

export interface ClassLabDTO {
  id: string;
  lab: LabDTO;
  url?: string;
  startDate: Date;
  endDate: Date;
  class: string;
  stepSuccess?: StepSuccess;
  name: string;
}
