import { ResponseStatus } from 'shared/constants';
import { ClassLab } from 'shared/models';
import { APIClientResponse } from 'shared/utilities';

export type ClassLabId = ClassLab['id'];

export type AttemptLabPayload = {
  isStudent: boolean;
  classLabId: ClassLabId;
};

export type AttemptLabResponse = APIClientResponse<ClassLab>;
export type AttemptLabFulfilledPayload = {
  isStudent: boolean;
  data: ClassLab;
};

export type LabAttemptionUIState = {
  finishLabStatus: ResponseStatus | null;
  attemptLabStatus: ResponseStatus | null;
};

export type FinishLabPayload = {
  isStudent: boolean;
  classLabId: ClassLabId;
};

export interface FinishLabFulfilledPayload {
  isStudent: boolean;
  classLabId: ClassLabId;
}
export type FinishLabResponseData = {
  classLabId: ClassLabId;
};
export type FinishLabResponse = APIClientResponse<FinishLabResponseData>;

export type AttemptLabCallback = (params: AttemptLabPayload) => void;

export type FinishLabCallback = (params: FinishLabPayload) => void;
