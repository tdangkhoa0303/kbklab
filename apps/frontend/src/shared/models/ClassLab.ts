import {Lab} from './Lab';

export type StepSuccess = boolean[][];

export interface ClassLab {
  id: string;
  lab: Lab;
  url?: string;
  startDate: string;
  endDate: string;
  class: string;
  stepSuccess?: StepSuccess;
  name: string;
}
