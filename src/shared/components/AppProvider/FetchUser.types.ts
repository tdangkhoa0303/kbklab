import {User} from "shared/models";
import {APIClientResponse} from 'shared/utilities';

export type UserState = User | null;

export type FetchUserResponse = APIClientResponse<User>;

export interface LoginPayload {
	email: string,
	password: string
}
export type LoginResponse = APIClientResponse<User>;