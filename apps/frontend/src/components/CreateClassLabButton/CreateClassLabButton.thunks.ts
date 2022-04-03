import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppContext} from 'shared/constants';
import {APIClient} from 'shared/utilities';
import {CreateClassLabPayload, CreateClassLabResponse, GetAllLabsResponse,} from './CreateClassLabButton.types';

export const getAllLabs = createAsyncThunk<GetAllLabsResponse>(
  `${AppContext.Lab}/getAllLabs`,
  async () => {
    const response = await APIClient.get<GetAllLabsResponse>('labs');
    return response.data;
  }
);

export const createClassLab = createAsyncThunk<
  CreateClassLabResponse,
  CreateClassLabPayload
>(`${AppContext.Lab}/createClassLab`, async (data) => {
  const response = await APIClient.post<CreateClassLabResponse>(
    'classLab/createClassLab',
    data
  );
  return response.data;
});
