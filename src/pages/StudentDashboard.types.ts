import {EntityState} from '@reduxjs/toolkit';
import {Lab} from 'shared/models';
import {APIClientResponse} from 'shared/utilities';
import {ResponseStatus} from 'shared/constants';

export type LabsState = EntityState<Lab>;

export type FetchStudentLabsResponseData = Lab[]
export type FetchStudentLabsResponse = APIClientResponse<FetchStudentLabsResponseData>;

export type CreateLabInstancePayload = string;
export type CreateLabInstanceResponse = APIClientResponse<string>;
export type CreateLabInstanceFulfilledPayload = {
	url: string
	labId: string
}

export type LabsUIState = {
	createInstanceStatus: ResponseStatus | null
}