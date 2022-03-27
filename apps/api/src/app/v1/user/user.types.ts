import {LecturerDTO, UserRole} from '@kbklab/api-interfaces';
import {ImportDataResult} from '../../../models';

export interface CreateUserPayload {
  email: string;
  name: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ImportLecturerPayload {
  file: Express.Multer.File
}

export interface ImportLecturerRow {
  email: string;
  fullName: string;
}

export type ImportLecturersResult = ImportDataResult<LecturerDTO>;
