import {createAsyncThunk} from '@reduxjs/toolkit';
import {FetchUserResponse, LoginPayload, LoginResponse} from './FetchUser.types';
import {APIClient} from '../../utilities';
import {AppContext} from '../../constants';

export const fetchUser = createAsyncThunk<FetchUserResponse>(`${AppContext.User}/fetchUser`, async () => {
	const response = await APIClient.get<FetchUserResponse>('/getUserInfo');
	return response.data;
})

export const login = createAsyncThunk<LoginResponse, LoginPayload>(`${AppContext.User}/login`, async (params) => {
	const response = await APIClient.post<FetchUserResponse>('/login', params);
	return response.data;
})