import {AppContext} from 'shared/constants';
import {createAsyncThunkWithErrorHandler} from 'shared/redux/utils';
import {APIClient} from 'shared/utilities';
import {
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
