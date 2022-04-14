import {ColDef} from 'ag-grid-community';
import {Location} from 'react-router-dom';
import {User, UserRole} from './models';

export const defaultActionColDef: Partial<ColDef> = {
  pinned: 'right',
  resizable: false,
  width: 64,
};

export interface Option<TValue = string> {
  value: TValue;
  label: string;
}

export interface RootState {
  user: UserState;
  asyncActions: AsyncActionsState;
  [key: string]: any;
}

export const EMPTY_STRING = '';

export enum AppCommonRoute {
  Root = '/',
  Student = 'student',
  LogIn = '/login',
  Score = '/score',
  ClassLab = '/classLab',
  ClassLabDetail = '/classLab/:classLabId/detail',
  LecturerManagement = '/lecturer-management',
  ClassManagement = '/class-management',
  ScoreDashboard = '/score-dashboard',
  ClassScoreDashboard = '/score-dashboard/:classCode',
  PracticePlayground = '/practice'
}

export enum ValidationError {
  Existed = 'validation.existed',
  Required = 'validation.required',
}

export enum AppContext {
  User = 'user',
  Lab = 'lab',
  Class = 'class',
  Lecturer = 'lecturer',
  Management = 'management',
  StudentLab = 'studentLab',
  ClassLab = 'classLab',
  Playground = 'playground'
}

export enum ResponseStatus {
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export enum LabStatus {
  Open = 'Open',
  InProgress = 'In progress',
  Closed = 'Closed',
  Future = 'Future',
}

export interface UserState {
  currentUser: User | null;
  isLoginSuccess: boolean | null;
  fetchUserInfoStatus: ResponseStatus | null;
}

export interface AsyncActionsState {
  currentActions: Record<string, boolean>;
  numberOfRequests: number;
}

export type FallbackPageByUserRole = {
  [key in UserRole]: string;
};

export interface LocationStateWithBackground {
  background: Location;
}

export const fallbackPageByUserRole: FallbackPageByUserRole = {
  [UserRole.Student]: '/student',
  [UserRole.Lecturer]: '/class-management',
  [UserRole.HeadDepartment]: '/class-management',
  [UserRole.Admin]: '/class-management',
};

export const userRoleTextMap = {
  [UserRole.Student]: 'Student',
  [UserRole.Lecturer]: 'Lecturer',
  [UserRole.HeadDepartment]: 'Head Department',
  [UserRole.Admin]: 'Admin',
};

export enum HttpStatusCode {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
}
