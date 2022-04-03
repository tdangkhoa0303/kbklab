import {EntityState} from '@reduxjs/toolkit';
import {CreateClassLabValues} from 'components';
import {ResponseStatus} from 'shared/constants';
import {Class, ClassLab} from 'shared/models';
import {APIClientResponse} from 'shared/utilities';

export type GetAllClassesResponseData = Class[];
export type GetAllClassesResponse =
  APIClientResponse<GetAllClassesResponseData>;

export type ClassesGridState = EntityState<Class>;

export type ImportClassesResponseData = {
  class: Class;
  errorRows: number[];
};
export type ImportClassesResponse =
  APIClientResponse<ImportClassesResponseData>;

export type ImportClassesPayload = FormData;

export interface ClassesUIState {
  currentDetailClassId: string | null;
  importClassesStatus: ResponseStatus | null;
  updateClassLabStatus: ResponseStatus | null;
  deleteClassLabStatus: ResponseStatus | null;
}

export interface ImportClassesFormValues {
  classCode: string;
  lecturerId: string;
}

export type UpdateClassLabPayload = Partial<CreateClassLabValues>;

export type UpdateClassLabFulfilledPayload = ClassLab;

export interface DeleteClassLabPayload {
  classLabId: string;
  classId: string;
}

export type DeleteClassLabFulfilledPayload = DeleteClassLabPayload;
