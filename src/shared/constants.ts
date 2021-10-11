export enum AppCommonRoute {
	Home = '/',
	LogIn = '/login',
	Score = '/score'
}

export enum ValidationError {
	Existed = 'validation.existed',
	Required = 'validation.required',
}

export enum AppContext {
	User = 'user',
	Lab = 'labs'
}

export enum ResponseStatus {
	Success = 'SUCCESS',
	Failed = 'FAILED'
}

export enum LabStatus {
	InProgress = 'In progress',
	Closed = 'Closed',
	Future = 'Future'
}