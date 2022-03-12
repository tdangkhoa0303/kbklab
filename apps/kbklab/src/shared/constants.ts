import {ColDef} from 'ag-grid-community';
import {User, UserRole} from './models';

export const defaultActionColDef: Partial<ColDef> = {
	pinned: 'right',
	resizable: false,
	width: 64,
}

export interface Option<TValue = string> {
	value: TValue,
	label: string,
}

export const EMPTY_STRING = '';

export enum AppCommonRoute {
	Root = '/',
	LogIn = '/login',
	Score = '/score',
	LecturerManagement = '/lecturer-management',
	ClassManagement = '/class-management',
	ScoreDashboard = '/score-dashboard',
	ClassScoreDashboard = '/score-dashboard/:classCode'
}

export enum ValidationError {
	Existed = 'validation.existed',
	Required = 'validation.required',
}

export enum AppContext {
	User = 'user',
	Lab = 'lab',
	Class = 'class',
	Lecturer = 'Lecturer',
	Management = 'management',
	StudentLab = 'studentLab',
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
	isLoginSuccess: boolean;
	fetchUserInfoStatus: ResponseStatus | null;
}

export interface AsyncActionsState {
	currentActions: Record<string, boolean>;
	numberOfRequests: number;
}

export interface RootState {
	user: UserState;
	asyncActions: AsyncActionsState;
	[key: string]: any;
}

export type FallbackPageByUserRole = {
	[key in UserRole]: string;
};

export const fallbackPageByUserRole: FallbackPageByUserRole = {
	[UserRole.Student]: '/',
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

