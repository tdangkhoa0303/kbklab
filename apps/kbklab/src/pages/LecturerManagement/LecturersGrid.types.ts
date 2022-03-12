import {EntityState} from '@reduxjs/toolkit';
import {FormikValues} from 'formik';
import {ResponseStatus} from 'shared/constants';
import {Lecturer} from 'shared/models';
import {APIClientResponse} from 'shared/utilities';

export type GetAllLecturersResponseData = Lecturer[];
export type GetAllLecturersResponse = APIClientResponse<GetAllLecturersResponseData>;

export type LecturersGridState = EntityState<Lecturer>;

export type ImportLecturersResponseData = Lecturer[];
export type ImportLecturersResponse = APIClientResponse<ImportLecturersResponseData>;

export type ImportLecturersPayload = FormData

export interface LecturersUIState {
	importLecturersStatus: ResponseStatus | null
}

export type ImportLecturerFormValues = FormikValues;
