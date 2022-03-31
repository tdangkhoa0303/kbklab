import { EntityState } from '@reduxjs/toolkit';
import { ResponseStatus } from 'shared/constants';
import { ClassLab } from 'shared/models';
import { APIClientResponse } from 'shared/utilities';

export type StudentLabsState = EntityState<ClassLab>;

export type FetchStudentLabsResponseData = ClassLab[];
export type FetchStudentLabsResponse =
  APIClientResponse<FetchStudentLabsResponseData>;

export type CreateLabInstancePayload = string;
export type CreateLabInstanceResponseData = Pick<
  ClassLab,
  'stepSuccess' | 'url'
>;
export type CreateLabInstanceResponse =
  APIClientResponse<CreateLabInstanceResponseData>;
export type CreateLabInstanceFulfilledPayload = Pick<
  ClassLab,
  'id' | 'stepSuccess' | 'url'
>;

export type LabsUIState = {
  createInstanceStatus: ResponseStatus | null;
  finishLabAttemptStatus: ResponseStatus | null;
};

export type FinishLabAttemptPayload = {
  classLabId: string;
};

export interface FinishLabAttemptFulfilledPayload {
  classLabId: string;
}
export type FinishLabAttemptResponse =
  APIClientResponse<FinishLabAttemptFulfilledPayload>;
