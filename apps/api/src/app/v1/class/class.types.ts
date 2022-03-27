import {User} from 'entities';
import {Express} from 'express';
import {ImportDataResult} from 'models';

export interface ImportClassPayload {
  lecturerId: string;
  classCode: string;
  file: Express.Multer.File;
}

export interface ImportStudentRow {
  email: string;
  fullName: string;
}

export type CreateClassStudentResult = ImportDataResult<User>;
