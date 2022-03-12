import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppContext} from 'shared/constants';
import {APIClient} from 'shared/utilities';
import {FetchStudentLabsResponse,} from './LabsGrid.types';

export const fetchStudentLabs = createAsyncThunk<FetchStudentLabsResponse>(
	`${AppContext.Lab}/fetchStudentLabs`,
	async () => {
		const response = await APIClient.get<FetchStudentLabsResponse>('labs/getAllStudentLabs');
		return response.data;
	}
);
