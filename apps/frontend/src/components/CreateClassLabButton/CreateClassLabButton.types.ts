import {EntityState} from '@reduxjs/toolkit';
import {ResponseStatus} from 'shared/constants';
import {ClassLab, Lab} from 'shared/models';
import {APIClientResponse} from 'shared/utilities';

export interface CreateClassLabValues {
  id?: string;
  labId: string;
  classId: string;
  startDate: string;
  endDate: string;
}

export type LabsState = EntityState<Lab>;
export interface LabsUIState {
  createdClassLabStatus: ResponseStatus | null;
}

export type GetAllLabsResponseData = Lab[];
export type GetAllLabsResponse = APIClientResponse<GetAllLabsResponseData>;

export type CreateClassLabResponseData = ClassLab;
export type CreateClassLabResponse =
  APIClientResponse<CreateClassLabResponseData>;

export type CreateClassLabPayload = CreateClassLabValues;
