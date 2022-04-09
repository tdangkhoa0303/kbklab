import {AppContext} from '../../constants';
import {createAsyncThunkWithErrorHandler} from '../../redux/utils';
import {APIClient} from '../../utilities/APIClient';
import {FetchUserResponse, LoginPayload, LoginResponse, LoginWithGooglePayload,} from './UserProvider.types';

export const fetchUser = createAsyncThunkWithErrorHandler<FetchUserResponse>(
  `${AppContext.User}/fetchUser`,
  async () => {
    const response = await APIClient.get<FetchUserResponse>(
      'users/getUserInfo'
    );
    return response.data;
  }
);

export const login = createAsyncThunkWithErrorHandler<LoginResponse, LoginPayload>(
  `${AppContext.User}/login`,
  async (params) => {
    const response = await APIClient.post<LoginResponse>('users/login', params);
    return response.data;
  }
);

export const loginWithGoogle = createAsyncThunkWithErrorHandler<
  LoginResponse,
  LoginWithGooglePayload
>(`${AppContext.User}/loginWithGoogle`, async (params) => {
  const response = await APIClient.post<LoginResponse>(
    'users/auth/google',
    params
  );
  return response.data;
});
