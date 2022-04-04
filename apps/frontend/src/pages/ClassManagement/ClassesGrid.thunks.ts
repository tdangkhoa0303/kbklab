import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppContext} from 'shared/constants';
import {ClassLab} from 'shared/models';
import {APIClient} from 'shared/utilities';
import {
  CreateLabInstanceFulfilledPayload,
  CreateLabInstancePayload,
  CreateLabInstanceResponse,
} from '../LabDashboard/LabsGrid.types';
import {
  DeleteClassLabFulfilledPayload,
  DeleteClassLabPayload,
  GetAllClassesResponse,
  ImportClassesPayload,
  ImportClassesResponse,
  UpdateClassLabFulfilledPayload,
  UpdateClassLabPayload,
} from './ClassesGrid.types';

export const getAllClasses = createAsyncThunk<GetAllClassesResponse>(
  `${AppContext.Management}/getAllClasses`,
  async () => {
    const response = await APIClient.get<GetAllClassesResponse>('classes');

    return response.data;
  }
);

export const importClasses = createAsyncThunk<
  ImportClassesResponse,
  ImportClassesPayload
>(`${AppContext.Management}/importClasses`, async (data) => {
  const response = await APIClient.post<ImportClassesResponse>('classes', data);

  return response.data;
});

export const openDemoLab = createAsyncThunk<
  CreateLabInstanceFulfilledPayload,
  CreateLabInstancePayload
>(`${AppContext.Lab}/createLabInstance`, async (id) => {
  const { data: response } = await APIClient.post<CreateLabInstanceResponse>(
    `instances/${id}/attempt`
  );
  return {
    ...response.data,
    id,
  };
});

export const updateClassLab = createAsyncThunk<
  UpdateClassLabFulfilledPayload,
  UpdateClassLabPayload
>(`${AppContext.Lab}/updateClassLab`, async (classLab) => {
  const { id } = classLab;
  const { data } = await APIClient.post<{ data: ClassLab }>(
    `classLab/${id}`,
    classLab
  ).then((response) => response.data);
  return data;
});

export const deleteClassLab = createAsyncThunk<
  DeleteClassLabFulfilledPayload,
  DeleteClassLabPayload
>(`${AppContext.Lab}/deleteClassLab`, async (payload) => {
  const { classLabId } = payload;
  await APIClient.delete<{ data: ClassLab }>(`classLab/${classLabId}`);

  return payload;
});
