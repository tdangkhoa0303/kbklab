import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppContext} from 'shared/constants';
import {APIClient} from 'shared/utilities';
import {GetAllLecturersResponse, ImportLecturersPayload, ImportLecturersResponse} from './LecturersGrid.types';

export const getAllLecturers = createAsyncThunk<GetAllLecturersResponse>(
	`${AppContext.Management}/getAllLecturers`,
	async () => {
		const response = await APIClient.get<GetAllLecturersResponse>('users/getAllLecturers');

		return response.data
	}
);

export const importLecturers = createAsyncThunk<ImportLecturersResponse, ImportLecturersPayload>(
	`${AppContext.Management}/importLecturers`,
	async (data) => {
		const response = await APIClient.post<ImportLecturersResponse>(
			'users/importLecturers',
			data
		);

		return response.data;
	}
);

