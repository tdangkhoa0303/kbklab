import {AppContext, RootState} from 'shared/constants';
import {createAsyncThunkWithErrorHandler} from 'shared/redux/utils';
import {APIClient, APIClientResponse} from 'shared/utilities';
import {
  DeleteLecturersFulfilledPayload,
  DeleteLecturersPayload,
  GetAllLecturersResponse,
  ImportLecturersPayload,
  ImportLecturersResponse,
  ImportLecturersResponseData,
} from './LecturersGrid.types';

export const getAllLecturers = createAsyncThunkWithErrorHandler<GetAllLecturersResponse>(
  `${AppContext.Management}/getAllLecturers`,
  async () => {
    const response = await APIClient.get<GetAllLecturersResponse>(
      'users/getAllLecturers'
    );

    return response.data;
  }
);

export const importLecturers = createAsyncThunkWithErrorHandler<
  ImportLecturersResponseData,
  ImportLecturersPayload
>(`${AppContext.Management}/importLecturers`, async (data) => {
  const response = await APIClient.post<ImportLecturersResponse>(
    'users/importLecturers',
    data
  );

  return response.data.data;
});

export const deleteLecturersThunk = createAsyncThunkWithErrorHandler<
  DeleteLecturersFulfilledPayload,
  DeleteLecturersPayload
>(``, async ({lecturers}, thunkAPI) => {
  await APIClient.post<APIClientResponse<boolean>>('/users/deleteLecturers', {lecturers});
  const state = thunkAPI.getState() as RootState;

  return {
    lecturers,
    user: state.user.currentUser,
  };
})
