import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppContext} from '../../constants';
import {APIClient} from '../../utilities/APIClient';
import {FetchUserResponse, LoginPayload, LoginResponse, LoginWithGooglePayload,} from './UserProvider.types';

export const fetchUser = createAsyncThunk<FetchUserResponse>(
  `${AppContext.User}/fetchUser`,
  async () => {
    const response = await APIClient.get<FetchUserResponse>(
      'users/getUserInfo'
    );
    return response.data;
  }
);

export const login = createAsyncThunk<LoginResponse, LoginPayload>(
  `${AppContext.User}/login`,
  async (params) => {
    const response = await APIClient.post<LoginResponse>('users/login', params);
    return response.data;
  }
);

export const loginWithGoogle = createAsyncThunk<
  LoginResponse,
  LoginWithGooglePayload
>(`${AppContext.User}/loginWithGoogle`, async (params) => {
  const response = await APIClient.post<LoginResponse>(
    'users/auth/google',
    params
  );
  return response.data;
});
