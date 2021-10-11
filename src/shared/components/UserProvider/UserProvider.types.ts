import {User} from "shared/models";
import {APIClientResponse} from 'shared/utilities';
import {ResponseStatus} from 'shared/constants';

export type UserState = User | null;
export type UIUserState = {
	isLoginSuccess: boolean,
	fetchUserInfoStatus: ResponseStatus | null
}

export type FetchUserResponse = APIClientResponse<User>;

export interface LoginPayload {
	email: string,
	password: string
}
export type LoginResponse = APIClientResponse<User>;