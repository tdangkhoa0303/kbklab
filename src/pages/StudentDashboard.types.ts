import {EntityState} from '@reduxjs/toolkit';
import {Lab} from 'shared/models';
import {APIClientResponse} from 'shared/utilities';
import {ResponseStatus} from 'shared/constants';

export type LabsState = EntityState<Lab>;

export type FetchStudentLabsResponseData = Lab[]
export type FetchStudentLabsResponse = APIClientResponse<FetchStudentLabsResponseData>;

export type CreateLabInstancePayload = string;
export type CreateLabInstanceResponseData = Pick<Lab, 'stepSuccess' | 'url'>
export type CreateLabInstanceResponse = APIClientResponse<CreateLabInstanceResponseData>;
export type CreateLabInstanceFulfilledPayload = Pick<Lab, 'labId' | 'stepSuccess' | 'url'>
export type LabsUIState = {
	createInstanceStatus: ResponseStatus | null,
	finishLabAttemptStatus: ResponseStatus | null
}

export type FinishLabAttemptPayload = Pick<Lab, 'labId'>;
export type FinishLabAttemptResponse = APIClientResponse<{}>;