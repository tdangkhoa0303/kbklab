import {createAsyncThunk} from '@reduxjs/toolkit';
import {APIClient} from 'shared/utilities';
import {AppContext} from 'shared/constants';
import {
	CreateLabInstanceFulfilledPayload,
	CreateLabInstancePayload,
	CreateLabInstanceResponse,
	FetchStudentLabsResponse, FinishLabAttemptPayload, FinishLabAttemptResponse
} from './StudentDashboard.types';

export const fetchStudentLabs = createAsyncThunk<FetchStudentLabsResponse>(`${AppContext.Lab}/fetchStudentLabs`, async () => {
	const response = await APIClient.get<FetchStudentLabsResponse>('labs/getAllStudentLabs');
	return response.data;
})

export const createLabInstance = createAsyncThunk<CreateLabInstanceFulfilledPayload, CreateLabInstancePayload>(
	`${AppContext.Lab}/createLabInstance`,
	async (labId) => {
		const response = await APIClient.post<CreateLabInstanceResponse>(`labs/${labId}/instances`);
		return {
			...response.data,
			labId,
		};
})

export const finishLabAttempt = createAsyncThunk<FinishLabAttemptResponse, FinishLabAttemptPayload>(
	`${AppContext.Lab}/finishLabAttempt`,
	async (payload) => {
		const response = await APIClient.post<FinishLabAttemptResponse>(`labs/finishAttempt`, payload);
		return response.data
	})