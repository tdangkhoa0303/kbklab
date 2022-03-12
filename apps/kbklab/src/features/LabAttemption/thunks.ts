import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppContext} from 'shared/constants';
import {APIClient} from 'shared/utilities';
import {
	AttemptLabFulfilledPayload,
	AttemptLabPayload,
	AttemptLabResponse,
	FinishLabFulfilledPayload,
	FinishLabPayload,
	FinishLabResponse
} from './types';

export const attemptLabThunk = createAsyncThunk<AttemptLabFulfilledPayload, AttemptLabPayload>(
	`${AppContext.Lab}/attemptLab`,
	async ({classLabId, isStudent}) => {
		const {data: response} = await APIClient.post<AttemptLabResponse>(`labs/${classLabId}/instances`);
		return {
			data: response.data,
			classLabId,
			isStudent,
		};
	}
);

export const finishLabThunk = createAsyncThunk<FinishLabFulfilledPayload, FinishLabPayload>(
	`${AppContext.Lab}/finishLab`,
	async (payload) => {
		const {data: response} = await APIClient.post<FinishLabResponse>(`labs/finishAttempt`, payload);
		return {
			...payload,
			...response.data
		};
	}
);
